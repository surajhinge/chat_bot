import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar"
      style={{
        background: "linear-gradient(90deg, #fde4cf, #dbeafe)", // Soft peach to pastel blue
        borderRadius: "0 0 20px 20px",
        padding: "15px 30px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Softer shadow for elegance
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: "700",
            color: "#000", // Black text for strong contrast
            letterSpacing: "1px",
          }}
        >
          Dnyani.com
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
