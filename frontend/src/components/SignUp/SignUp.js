import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://server.vastyam.com:8000/api/users/signup/", {
        mobile,
        password,
      });
      navigate("/"); // Redirect to login page
    } catch (error) {
      alert("Error: Mobile number may already exist");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #8e44ad, #3498db)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "15px",
          background: "#ffffff",
        }}
      >
        <h3
          className="text-center mb-3"
          style={{
            color: "#4a4a4a",
            fontWeight: "bold",
          }}
        >
          Create Your Account
        </h3>
        <p className="text-center text-muted mb-4">
          Sign up to start your journey!
        </p>
        <form onSubmit={handleSignup}>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="mb-2" style={{ color: "#6c757d" }}>
            Already have an account?
          </p>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/")}
            style={{
              borderRadius: "10px",
              padding: "10px 20px",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
