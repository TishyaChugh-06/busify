import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { mockUsers } from '../../mockData';
import './AdminPages.css';

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    route: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      ...formData
    };
    setUsers([...users, newUser]);
    setShowForm(false);
    setFormData({ name: '', email: '', role: 'student', route: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
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
            <p>View and manage all registered users</p>
          </div>
          
          <div className="card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2>Registered Users</h2>
              <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add New User'}
              </button>
            </div>
            
            {showForm && (
              <form onSubmit={handleSubmit} style={{marginBottom: '30px', padding: '20px', backgroundColor: 'var(--light-gray)', borderRadius: 'var(--border-radius)'}}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Assigned Route</label>
                  <input type="text" name="route" placeholder="e.g., Route A" value={formData.route} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Add User</button>
              </form>
            )}
            
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
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td style={{textTransform: 'capitalize'}}>{user.role}</td>
                    <td>{user.route}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '14px'}}>Edit</button>
                        <button className="btn btn-danger" style={{padding: '6px 12px', fontSize: '14px'}} onClick={() => handleDelete(user.id)}>Delete</button>
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
