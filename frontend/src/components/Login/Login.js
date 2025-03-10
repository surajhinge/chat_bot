import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://server.vastyam.com:8000/api/users/login/", {
        mobile,
        password,
      });
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      navigate("/home"); // Navigate to the home page after login
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "15px",
          background: "#ffffff",
        }}
      >
        <h3 className="text-center mb-3" style={{ color: "#4a4a4a" }}>
          Welcome to Vastyam.com
        </h3>
        <p className="text-center text-muted mb-4">
          Log in to access your account.
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label fw-bold">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              className="form-control"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                background: "linear-gradient(135deg, #0072ff, #00c6ff)",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
              }}
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mb-2" style={{ color: "#6c757d" }}>
            Don't have an account?
          </p>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/signup")}
            style={{
              borderRadius: "10px",
              padding: "10px 20px",
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
