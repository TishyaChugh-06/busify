import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./AdminPages.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);

  // ✅ Fetch payments + users from JSON Server
  const fetchPayments = async () => {
    const res = await fetch("http://localhost:3001/payments");
    const data = await res.json();
    setPayments(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchPayments();
    fetchUsers();
  }, []);

  // ✅ Get user's name from userId
  // ✅ FIX: Resolve name from multiple possible fields
const getUserName = (payment) => {
  // 1️⃣ If payment directly has name or userName (most real-world)
  if (payment.name) return payment.name;
  if (payment.userName) return payment.userName;

  // 2️⃣ If userId exists → find in users table
  if (payment.userId) {
    const user = users.find((u) => u.id == payment.userId);
    if (user) return user.name;
  }

  // 3️⃣ Fallback
  return "Unknown";
};


  // ✅ Update payment status dynamically
  const handleStatusChange = async (id, newStatus) => {
    await fetch(`http://localhost:3001/payments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchPayments(); // refresh data
  };

  // ✅ Calculate totals dynamically
  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const completedPayments = payments.filter((p) => p.status === "completed").length;
  const pendingPayments = payments.filter((p) => p.status === "pending").length;

  return (
    <div>
      <Navbar role="admin" />
      <div className="dashboard-layout">
        <Sidebar role="admin" />
        <main className="main-content">
          <div className="page-header">
            <h1>Payment Management</h1>
            <p>Track and manage all payment transactions</p>
          </div>

          {/* ==== STATS ==== */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: "#E8F5E9" }}>
                💰
              </div>
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <p className="stat-number">₹{totalRevenue}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: "#E3F2FD" }}>
                ✅
              </div>
              <div className="stat-content">
                <h3>Completed</h3>
                <p className="stat-number">{completedPayments}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: "#FFF3E0" }}>
                ⏳
              </div>
              <div className="stat-content">
                <h3>Pending</h3>
                <p className="stat-number">{pendingPayments}</p>
              </div>
            </div>
          </div>

          {/* ==== TABLE ==== */}
          <div className="card">
            <h2>All Payments</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{getUserName(payment)}</td>
                    <td>{payment.type}</td>
                    <td>₹{payment.amount}</td>
                    <td>{payment.date}</td>
                    <td>
                      <select
                        value={payment.status}
                        onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                        style={{
                          padding: "6px 12px",
                          border: "1px solid var(--gray)",
                          borderRadius: "var(--border-radius)",
                          color:
                            payment.status === "completed"
                              ? "var(--success)"
                              : "var(--warning)",
                          fontWeight: "500",
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payments;

