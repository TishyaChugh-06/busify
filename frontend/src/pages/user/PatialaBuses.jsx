import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./UserPages.css";

const PatialaBuses = () => {
  const buses = ["201", "202", "203", "204"];
  const navigate = useNavigate();

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />
        <main className="main-content">
          <h2>Buses Going to Patiala</h2>
          <div className="bus-list">
            {buses.map((num) => (
              <div key={num} className="bus-box">
                <h3>Bus No: {num}</h3>

                {/* FIXED: Added backticks */}
                <button
                  className="btn"
                  onClick={() => navigate(`/user/stops/${num}`)}
                >
                  View Stops
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatialaBuses;
