import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register the necessary components of Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const [shipmentsData, setShipmentsData] = useState([]);

  useEffect(() => {
    // Fetch shipments data from your backend
    fetch("/api/shipments") // Adjust with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setShipmentsData(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Dummy Data - Replace this with data from your API (for initial testing)
  const data = {
    labels: shipmentsData.map((shipment) => shipment.product), // Product names on the X-axis
    datasets: [
      {
        label: "Delivery Percentage",
        data: shipmentsData.map((shipment) => shipment.deliveryPercentage), // Delivery percentage on the Y-axis
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Shipments Delivery Analytics",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        type: "category", // Using category scale for the x-axis
      },
      y: {
        type: "linear", // Using linear scale for the y-axis
        beginAtZero: true, // Ensuring the y-axis starts at zero
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shipments Analytics</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
