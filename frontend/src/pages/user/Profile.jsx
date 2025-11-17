
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./UserPages.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    route: "",
  });
  const [userId, setUserId] = useState(null);

  // Fetch user data from JSON Server (replace "1" with actual logged-in user ID)
  useEffect(() => {
    fetch("http://localhost:3001/users/1")
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "+91 9876543210",
          studentId: data.studentId || "STU2024001",
          route: data.route || "Route A",
        });
        setUserId(data.id);
      })
      .catch((err) => console.error("Error loading profile:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not found!");
      return;
    }

    fetch(`http://localhost:3001/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />
        <main className="main-content">
          <div className="page-header">
            <h1>User Profile</h1>
            <p>Manage your personal information</p>
          </div>

          <div className="card">
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Student/Faculty ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Assigned Route</label>
                <input
                  type="text"
                  name="route"
                  value={formData.route}
                  readOnly
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
