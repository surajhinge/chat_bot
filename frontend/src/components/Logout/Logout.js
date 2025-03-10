import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect to login page
    // alert("You have been logged out successfully! Click OK to logout.");
    navigate("/");
  }, [navigate]);

  return null; // Optional: You can add a loading spinner or message while logging out
};

export default Logout;
