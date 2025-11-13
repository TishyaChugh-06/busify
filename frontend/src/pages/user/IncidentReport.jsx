import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import './UserPages.css';

const IncidentReport = () => {
  const [formData, setFormData] = useState({
    busNumber: '',
    description: '',
    severity: 'low'
  });
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 1; // replace with logged-in user ID

  // Fetch incidents from JSON Server
  useEffect(() => {
    fetch(`http://localhost:3001/incidents?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setIncidents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIncident = {
      ...formData,
      userId,
      status: 'pending', // default status when reported
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    };

    fetch('http://localhost:3001/incidents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIncident)
    })
      .then(res => res.json())
      .then(data => {
        alert('Incident reported successfully!');
        setIncidents([...incidents, data]); // update table immediately
        setFormData({ busNumber: '', description: '', severity: 'low' });
      })
      .catch(err => console.error(err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />
        <main className="main-content">
          <div className="page-header">
            <h1>Report Incident</h1>
            <p>Report any issues or incidents with the bus service</p>
          </div>
          
          <div className="card">
            <h2>Submit Incident Report</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Bus Number</label>
                <input
                  type="text"
                  name="busNumber"
                  placeholder="e.g., BUS-001"
                  value={formData.busNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Severity</label>
                <select name="severity" value={formData.severity} onChange={handleChange}>
                  <option value="low">Low - Minor Issue</option>
                  <option value="medium">Medium - Needs Attention</option>
                  <option value="high">High - Urgent</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="5"
                  placeholder="Describe the incident in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                Submit Report
              </button>
            </form>
          </div>
          
          <div className="card">
            <h2>Recent Incidents</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Bus Number</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map(incident => (
                  <tr key={incident.id}>
                    <td>{incident.busNumber}</td>
                    <td>{incident.description}</td>
                    <td>{incident.date}</td>
                    <td style={{
                      color: incident.status === 'resolved' ? 'var(--success)' :
                             incident.status === 'in-progress' ? 'var(--warning)' : 'var(--danger)',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {incident.status}
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

export default IncidentReport;
