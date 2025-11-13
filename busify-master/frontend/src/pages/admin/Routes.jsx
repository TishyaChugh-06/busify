import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import './AdminPages.css';

const Routes = () => {
  const [routes, setRoutes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    stops: '',
    duration: ''
  });

  const apiUrl = 'http://localhost:3001/routes';

  // ✅ Fetch routes from JSON Server
  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setRoutes(data))
      .catch(err => console.error("Error fetching routes:", err));
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or update route
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRoute = {
      name: formData.name,
      stops: formData.stops.split(',').map(s => s.trim()),
      duration: formData.duration
    };

    if (formData.id) {
      // Update existing route
      await fetch(`${apiUrl}/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoute)
      });
      setRoutes(routes.map(route => (route.id === formData.id ? { ...newRoute, id: formData.id } : route)));
    } else {
      // Add new route
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoute)
      });
      const data = await res.json();
      setRoutes([...routes, data]);
    }

    setShowForm(false);
    setFormData({ name: '', stops: '', duration: '' });
  };

  // ✅ Edit route
  const handleEdit = (route) => {
    setFormData({
      id: route.id,
      name: route.name,
      stops: route.stops.join(', '),
      duration: route.duration
    });
    setShowForm(true);
  };

  // ✅ Delete route
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      setRoutes(routes.filter(route => route.id !== id));
    }
  };

  return (
    <div>
      <Navbar role="admin" />
      <div className="dashboard-layout">
        <Sidebar role="admin" />
        <main className="main-content">
          <div className="page-header">
            <h1>Manage Routes</h1>
            <p>Create and manage bus routes and stops</p>
          </div>

          <div className="card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2>Bus Routes</h2>
              <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add New Route'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} style={{marginBottom: '30px', padding: '20px', backgroundColor: 'var(--light-gray)', borderRadius: 'var(--border-radius)'}}>
                <div className="form-group">
                  <label>Route Name</label>
                  <input type="text" name="name" placeholder="e.g., Route D" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Stops (comma separated)</label>
                  <input type="text" name="stops" placeholder="Stop 1, Stop 2, Stop 3" value={formData.stops} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input type="text" name="duration" placeholder="e.g., 30 min" value={formData.duration} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">
                  {formData.id ? 'Update Route' : 'Add Route'}
                </button>
              </form>
            )}

            <div style={{display: 'grid', gap: '20px'}}>
              {routes.map(route => (
                <div key={route.id} style={{padding: '20px', backgroundColor: 'var(--light-gray)', borderRadius: 'var(--border-radius)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                    <h3>{route.name}</h3>
                    <div className="action-buttons">
                      <button
                        className="btn btn-secondary"
                        style={{padding: '6px 12px', fontSize: '14px'}}
                        onClick={() => handleEdit(route)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{padding: '6px 12px', fontSize: '14px'}}
                        onClick={() => handleDelete(route.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p><strong>Duration:</strong> {route.duration}</p>
                  <p><strong>Stops:</strong> {route.stops.join(' → ')}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Routes;
