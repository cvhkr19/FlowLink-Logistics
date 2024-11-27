import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="container">
      <h1 className="header">Welcome to Supply Chain Management</h1>
      <p className="description">
        Streamline your shipment process and track analytics with ease.
      </p>
      <div className="button-container">
        <Link to="/login">
          <button className="button">Login</button>
        </Link>
        <Link to="/data-entry">
          <button className="button">Enter Data</button>
        </Link>
        <Link to="/analytics">
          <button className="button">View Analytics</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
