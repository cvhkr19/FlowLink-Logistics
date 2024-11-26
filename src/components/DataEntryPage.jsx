import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navba";
const DataEntryPage = () => {
  const [formData, setFormData] = useState({
    product: "",
    shipper: "",
    status: "Pending",
    customer: "",
    customerId: "",
    trackingNumber: "",
    deliveryStatus: "Pending",
    deliveryPercentage: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/shipments", formData);
      alert("Shipment data added!");
    } catch (error) {
      console.error("Error adding data:", error);
      alert("Failed to add data.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Data Entry</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="product"
          placeholder="Product"
          value={formData.product}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="shipper"
          placeholder="Shipper"
          value={formData.shipper}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="text"
          name="customer"
          placeholder="Customer"
          value={formData.customer}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={formData.customerId}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="trackingNumber"
          placeholder="Tracking Number"
          value={formData.trackingNumber}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <select
          name="deliveryStatus"
          value={formData.deliveryStatus}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
        <input
          type="number"
          name="deliveryPercentage"
          placeholder="Delivery %"
          value={formData.deliveryPercentage}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default DataEntryPage;
