import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import './AdminPages.css';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: '+91 9876543210',
    department: 'Transport Management'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update localStorage
    const updatedUser = { ...user, name: formData.name, email: formData.email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <Navbar role="admin" />
      <div className="dashboard-layout">
        <Sidebar role="admin" />
        <main className="main-content">
          <div className="page-header">
            <h1>Admin Profile</h1>
            <p>Manage your administrative profile</p>
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
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
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
