import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { mockIncidents } from '../../mockData';
import './UserPages.css';

const IncidentReport = () => {
  const [formData, setFormData] = useState({
    busNumber: '',
    description: '',
    severity: 'low'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Incident reported successfully!');
    setFormData({ busNumber: '', description: '', severity: 'low' });
  };

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
                {mockIncidents.map(incident => (
                  <tr key={incident.id}>
                    <td>{incident.busNumber}</td>
                    <td>{incident.description}</td>
                    <td>{incident.date}</td>
                    <td>
                      <span style={{
                        color: incident.status === 'resolved' ? 'var(--success)' : 
                               incident.status === 'in-progress' ? 'var(--warning)' : 'var(--danger)',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {incident.status}
                      </span>
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
