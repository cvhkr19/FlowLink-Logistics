import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "/register" : "/login";
    const url = `http://localhost:5000${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        if (!isRegister) {
          localStorage.setItem("token", data.token);
          alert("Login successful");
          navigate("/data-entry");
        } else {
          alert("Registration successful");
          setIsRegister(false);
        }
      } else {
        alert(data.error || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the server");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{isRegister ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <button type="submit" style={{ marginRight: "10px" }}>
          {isRegister ? "Register" : "Login"}
        </button>
        <button type="button" onClick={() => setIsRegister(!isRegister)}>
          Switch to {isRegister ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
