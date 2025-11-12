import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { mockRoutes } from '../../mockData';
import './AdminPages.css';

const Routes = () => {
  const [routes, setRoutes] = useState(mockRoutes);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    stops: '',
    duration: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoute = {
      id: routes.length + 1,
      name: formData.name,
      stops: formData.stops.split(',').map(s => s.trim()),
      duration: formData.duration
    };
    setRoutes([...routes, newRoute]);
    setShowForm(false);
    setFormData({ name: '', stops: '', duration: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
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
                <button type="submit" className="btn btn-primary">Add Route</button>
              </form>
            )}
            
            <div style={{display: 'grid', gap: '20px'}}>
              {routes.map(route => (
                <div key={route.id} style={{padding: '20px', backgroundColor: 'var(--light-gray)', borderRadius: 'var(--border-radius)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                    <h3>{route.name}</h3>
                    <div className="action-buttons">
                      <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '14px'}}>Edit</button>
                      <button className="btn btn-danger" style={{padding: '6px 12px', fontSize: '14px'}} onClick={() => handleDelete(route.id)}>Delete</button>
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
