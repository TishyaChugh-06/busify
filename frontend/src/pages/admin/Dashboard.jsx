import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./AdminPages.css";

const Dashboard = () => {
  const [buses, setBuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [incidents, setIncidents] = useState([]);

  // ✅ Fetch all data from JSON Server
  useEffect(() => {
    fetch("http://localhost:3001/buses").then(res => res.json()).then(setBuses);
    fetch("http://localhost:3001/users").then(res => res.json()).then(setUsers);
    fetch("http://localhost:3001/payments").then(res => res.json()).then(setPayments);
    fetch("http://localhost:3001/incidents").then(res => res.json()).then(setIncidents);
  }, []);

  return (
    <div>
      <Navbar role="admin" />
      <div className="dashboard-layout">
        <Sidebar role="admin" />
        <main className="main-content">
          <div className="page-header">
            <h1>Admin Dashboard</h1>
            <p>Overview of the bus management system</p>
          </div>

          {/* ==== STAT CARDS ==== */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: "#E3F2FD" }}>🚌</div>
              <div className="stat-content">
                <h3>Total Buses</h3>
                <p className="stat-number">{buses.length}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: "#E8F5E9" }}>✅</div>
              <div className="stat-content">
                <h3>Active Buses</h3>
                <p className="stat-number">
                  {buses.filter(b => b.status === "active").length}
                </p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: "#FFF3E0" }}>👥</div>
              <div className="stat-content">
                <h3>Total Users</h3>
                <p className="stat-number">{users.length}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: "#FCE4EC" }}>⚠️</div>
              <div className="stat-content">
                <h3>Pending Incidents</h3>
                <p className="stat-number">
                  {incidents.filter(i => i.status !== "resolved").length}
                </p>
              </div>
            </div>
          </div>

          {/* ==== TABLE SECTIONS ==== */}
          <div className="dashboard-grid">
            {/* BUSES */}
            <div className="card">
              <h2>Bus Fleet Status</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Bus Number</th>
                    <th>Route</th>
                    <th>Driver</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map(bus => (
                    <tr key={bus.id}>
                      <td>{bus.busNumber}</td>
                      <td>{bus.route}</td>
                      <td>{bus.driver}</td>
                      <td>
                        <span
                          style={{
                            color: bus.status === "active" ? "var(--success)" : "var(--warning)",
                            fontWeight: "500",
                            textTransform: "capitalize",
                          }}
                        >
                          {bus.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAYMENTS */}
            <div className="card">
              <h2>Recent Payments</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.slice(-5).reverse().map(payment => (
                    <tr key={payment.id}>
                      <td>{payment.date}</td>
                      <td>₹{payment.amount}</td>
                      <td>
                        <span
                          style={{
                            color: payment.status === "completed" ? "var(--success)" : "var(--warning)",
                            fontWeight: "500",
                            textTransform: "capitalize",
                          }}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

