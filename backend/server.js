const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_jwt_secret_key";

app.use(cors());
app.use(express.json());

// Connect to the MongoDB "SCM" database
mongoose.connect("mongodb+srv://Inferno:Test123@cluster0.bycscce.mongodb.net/SCM", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB database 'SCM'"));


const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "users" } // Specify collection name
);

const User = mongoose.model("User", userSchema);

// Shipment Schema explicitly using "shipments" collection
const shipmentSchema = new mongoose.Schema(
  {
    product: String,
    shipper: String,
    status: { type: String, enum: ["Approved", "Pending", "Rejected"], default: "Pending" },
    customer: String,
    customerId: String,
    trackingNumber: String,
    deliveryStatus: { type: String, enum: ["Pending", "In Transit", "Delivered"], default: "Pending" },
    deliveryPercentage: Number,
    date: { type: Date, default: Date.now },
  },
  { collection: "shipments" } // Specify collection name
);

const Shipment = mongoose.model("Shipment", shipmentSchema);

// Routes
// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User registration failed" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Protected route for testing
app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "Access granted", user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Shipment Routes
// Add shipment data (POST)
app.post("/api/shipments", async (req, res) => {
  const { product, shipper, status, customer, customerId, trackingNumber, deliveryStatus, deliveryPercentage } = req.body;

  try {
    const shipment = new Shipment({
      product,
      shipper,
      status,
      customer,
      customerId,
      trackingNumber,
      deliveryStatus,
      deliveryPercentage,
    });
    await shipment.save();
    res.status(201).json({ message: "Shipment data added successfully!" });
  } catch (error) {
    console.error("Error adding shipment:", error);
    res.status(500).json({ error: "Failed to add shipment data." });
  }
});

// Get shipment analytics (GET)
app.get("/api/shipments", async (req, res) => {
  try {
    const shipments = await Shipment.aggregate([
      {
        $group: {
          _id: { $month: "$date" },  // Group by month
          shipments: { $sum: 1 },     // Count number of shipments
          deliveries: {
            $sum: { $cond: [{ $eq: ["$deliveryStatus", "Delivered"] }, 1, 0] },  // Count delivered shipments
          },
        },
      },
      {
        $project: {
          month: "$_id",
          shipments: 1,
          deliveries: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } }, // Sort by month (ascending)
    ]);

    const recentActivity = await Shipment.find()
      .sort({ date: -1 })
      .limit(5)
      .select("product shipper status customer customerId");

    res.json({ analytics: shipments, recentActivity });
  } catch (error) {
    console.error("Error fetching shipment data:", error);
    res.status(500).json({ error: "Failed to fetch shipment data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
