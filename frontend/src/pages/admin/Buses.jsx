import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import './AdminPages.css';

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    busNumber: '',
    capacity: '',
    driver: '',
    route: '',
    status: 'active'
  });

  const apiUrl = 'http://localhost:3001/buses';

  // ✅ Fetch buses from JSON server
  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setBuses(data))
      .catch(err => console.error("Error fetching buses:", err));
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or update bus
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id ? `${apiUrl}/${formData.id}` : apiUrl;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, capacity: parseInt(formData.capacity) })
    })
      .then(res => res.json())
      .then(data => {
        if (formData.id) {
          setBuses(buses.map(bus => (bus.id === data.id ? data : bus)));
        } else {
          setBuses([...buses, data]);
        }
        setFormData({ busNumber: '', capacity: '', driver: '', route: '', status: 'active' });
        setShowForm(false);
      });
  };

  // ✅ Edit bus
  const handleEdit = (bus) => {
    setFormData(bus);
    setShowForm(true);
  };

  // ✅ Delete bus
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(() => setBuses(buses.filter(bus => bus.id !== id)));
    }
  };

  return (
    <div>
      <Navbar role="admin" />
      <div className="dashboard-layout">
        <Sidebar role="admin" />
        <main className="main-content">
          <div className="page-header">
            <h1>Manage Buses</h1>
            <p>Add, edit, or remove buses from the fleet</p>
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              
              <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add New Bus'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', backgroundColor: 'var(--light-gray)', borderRadius: 'var(--border-radius)' }}>
                <div className="form-group">
                  <label>Bus Number</label>
                  <input type="text" name="busNumber" value={formData.busNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Driver Name</label>
                  <input type="text" name="driver" value={formData.driver} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Route</label>
                  <input type="text" name="route" value={formData.route} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  {formData.id ? 'Update Bus' : 'Add Bus'}
                </button>
              </form>
            )}

            <table className="table">
              <thead>
                <tr>
                  <th>Bus Number</th>
                  <th>Capacity</th>
                  <th>Driver</th>
                  <th>Route</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map(bus => (
                  <tr key={bus.id}>
                    <td>{bus.busNumber}</td>
                    <td>{bus.capacity}</td>
                    <td>{bus.driver}</td>
                    <td>{bus.route}</td>
                    <td>
                      <span style={{
                        color: bus.status === 'active' ? 'var(--success)' : 'var(--warning)',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {bus.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '14px' }}
                          onClick={() => handleEdit(bus)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ padding: '6px 12px', fontSize: '14px' }}
                          onClick={() => handleDelete(bus.id)}
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

export default Buses;
