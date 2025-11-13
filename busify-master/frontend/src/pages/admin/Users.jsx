import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./AdminPages.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    route: "",
  });

  // ✅ Fetch all users
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingUser) {
      // Update existing user
      await fetch(`http://localhost:3001/users/${editingUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setEditingUser(null);
    } else {
      // Add new user
      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    setFormData({ name: "", email: "", role: "student", route: "" });
    setShowForm(false);
    fetchUsers();
  };

  // ✅ Edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      route: user.route,
    });
    setShowForm(true);
  };

  // ✅ Delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" });
      fetchUsers();
    }
  };

  return (
    <div>
      <Navbar role="admin" />
      <div className="dashboard-layout">
        <Sidebar role="admin" />
        <main className="main-content">
          <div className="page-header">
            <h1>Manage Users</h1>
            <p>View, add, edit, and remove users</p>
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
              <h2>Registered Users</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingUser(null);
                  setFormData({
                    name: "",
                    email: "",
                    role: "student",
                    route: "",
                  });
                }}
              >
                {showForm ? "Cancel" : "Add New User"}
              </button>
            </div>

            {/* ✅ Add/Edit Form */}
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
                  <label>Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Assigned Route</label>
                  <input
                    type="text"
                    name="route"
                    value={formData.route}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </form>
            )}

            {/* ✅ Users Table */}
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Route</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td style={{ textTransform: "capitalize" }}>{user.role}</td>
                    <td>{user.route}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-secondary"
                          style={{
                            padding: "6px 12px",
                            fontSize: "14px",
                            marginRight: "5px",
                          }}
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{
                            padding: "6px 12px",
                            fontSize: "14px",
                          }}
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </div>
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

export default Users;

