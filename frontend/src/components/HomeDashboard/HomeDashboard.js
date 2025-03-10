import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMapMarkerAlt,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const HomeDashboard = () => {
  const navigate = useNavigate();

  const catalogItems = [
    {
      name: "Flats",
      icon: faBuilding,
      navigate: "/flats",
    },
    {
      name: "Plots",
      icon: faMapMarkerAlt,
      navigate: "/plots",
    },
    // Uncomment this section if needed
    // {
    //   name: "Projects",
    //   icon: faBullhorn,
    //   navigate: "/projects",
    // },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
        padding: "20px",
      }}
    >
      <Navbar />

      <div className="container text-center mt-5">
        <h1
          style={{
            color: "#4a4a4a",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          Explore Our Offerings
        </h1>

        <div className="row justify-content-center">
          {catalogItems.map((item, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 mb-4"
              key={index}
              style={{ padding: "10px" }}
            >
              <div
                className="card shadow-lg text-center"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  background: "#ffffff",
                }}
              >
                <div
                  className="card-body"
                  style={{
                    padding: "30px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    size="3x"
                    className="mb-3 text-primary"
                  />
                  <h5 className="card-title" style={{ fontWeight: "600" }}>
                    {item.name}
                  </h5>
                  <button
                    className="btn btn-primary mt-3"
                    style={{
                      background: "linear-gradient(135deg, #0072ff, #00c6ff)",
                      border: "none",
                      borderRadius: "10px",
                      padding: "10px 20px",
                      color: "#fff",
                      fontWeight: "500",
                    }}
                    onClick={() => navigate(item.navigate)}
                  >
                    Go to {item.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
