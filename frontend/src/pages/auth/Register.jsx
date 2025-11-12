import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Mock registration - store in localStorage
    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    
    // Redirect to login
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Busify</h1>
          <p>Create Your Account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
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
              placeholder="Enter your email"
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Register As</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">Student/Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <a href="/">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
