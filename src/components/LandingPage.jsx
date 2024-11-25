import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Supply Chain Management</h1>
      <p>Streamline your shipment process and track analytics with ease.</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login" style={{ margin: "10px", textDecoration: "none" }}>
          <button>Login</button>
        </Link>
        <Link to="/data-entry" style={{ margin: "10px", textDecoration: "none" }}>
          <button>Enter Data</button>
        </Link>
        <Link to="/analytics" style={{ margin: "10px", textDecoration: "none" }}>
          <button>View Analytics</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
