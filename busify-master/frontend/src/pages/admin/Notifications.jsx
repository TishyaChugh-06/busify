import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./AdminPages.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
  });

  // ✅ Fetch notifications from JSON server
  const fetchNotifications = async () => {
    const res = await fetch("http://localhost:3001/notifications");
    const data = await res.json();
    setNotifications(data.reverse()); // newest first
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ✅ Add new notification
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNotification = {
      title: formData.title,
      message: formData.message,
      type: formData.type,
      date: new Date().toLocaleString(),
    };

    await fetch("http://localhost:3001/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNotification),
    });

    setShowForm(false);
    setFormData({ title: "", message: "", type: "info" });
    fetchNotifications(); // reload after adding
  };

  // ✅ Delete notification
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      await fetch(`http://localhost:3001/notifications/${id}`, {
        method: "DELETE",
      });
      fetchNotifications();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "warning":
        return "var(--warning)";
      case "alert":
        return "var(--danger)";
      default:
        return "var(--primary)";
    }
  };

  return (
    <div>
      <Navbar role="admin" />
      <div className="dashboard-layout">
        <Sidebar role="admin" />
        <main className="main-content">
          <div className="page-header">
            <h1>Manage Notifications</h1>
            <p>Send notifications to all users</p>
          </div>

          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2>Notifications</h2>
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel" : "Create Notification"}
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={handleSubmit}
                style={{
                  marginBottom: "30px",
                  padding: "20px",
                  backgroundColor: "var(--light-gray)",
                  borderRadius: "var(--border-radius)",
                }}
              >
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="alert">Alert</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Notification
                </button>
              </form>
            )}

            <div style={{ display: "grid", gap: "12px" }}>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    style={{
                      padding: "16px",
                      backgroundColor: "var(--white)",
                      border: "1px solid var(--gray)",
                      borderLeft: `4px solid ${getNotificationColor(
                        notification.type
                      )}`,
                      borderRadius: "var(--border-radius)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        marginBottom: "8px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <strong style={{ fontSize: "16px" }}>
                          {notification.title}
                        </strong>
                        <span
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#999",
                            marginTop: "4px",
                          }}
                        >
                          {notification.date}
                        </span>
                      </div>
                      <button
                        className="btn btn-danger"
                        style={{
                          padding: "6px 12px",
                          fontSize: "14px",
                        }}
                        onClick={() => handleDelete(notification.id)}
                      >
                        Delete
                      </button>
                    </div>
                    <p style={{ margin: "8px 0", color: "#666" }}>
                      {notification.message}
                    </p>
                    <span
                      style={{
                        fontSize: "12px",
                        color: getNotificationColor(notification.type),
                        fontWeight: "500",
                        textTransform: "uppercase",
                      }}
                    >
                      {notification.type}
                    </span>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center", color: "#888" }}>
                  No notifications found
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;

