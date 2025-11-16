import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dynamic email placeholder based on selected role
  const getEmailPlaceholder = () => {
    return formData.role === "admin"
      ? "Enter email (e.g., admin@admin.chitkara.edu.in)"
      : "Enter email (e.g., abc@chitkara.edu.in)";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = formData.email;

    // Validate email domain for Student/Faculty
    if (formData.role === "user" && !email.endsWith("@chitkara.edu.in")) {
      alert("Only @chitkara.edu.in emails are allowed for students/faculty.");
      return;
    }

    // Validate email domain for Admin
    if (formData.role === "admin" && !email.endsWith("@admin.chitkara.edu.in")) {
      alert("Only @admin.chitkara.edu.in emails are allowed for admins.");
      return;
    }

    // Mock login
    const userData = {
      email: formData.email,
      role: formData.role,
      name: formData.email.split("@")[0],
    };

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");

    // Redirect based on role
    if (formData.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Busify</h1>
          <p>University Bus Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder={getEmailPlaceholder()}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Login As</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">Student/Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
