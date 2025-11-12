import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import './AdminPages.css';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);

  // ✅ Fetch data from JSON Server
  const fetchIncidents = async () => {
    try {
      const res = await fetch("http://localhost:3001/incidents");
      const data = await res.json();
      setIncidents(data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  // ✅ Update incident status (PATCH)
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:3001/incidents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchIncidents(); // refresh data after update
    } catch (error) {
      console.error("Error updating incident:", error);
    }
  };

  // ✅ Delete incident from JSON Server
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this incident?")) {
      try {
        await fetch(`http://localhost:3001/incidents/${id}`, {
          method: "DELETE",
        });
        fetchIncidents(); // refresh data
      } catch (error) {
        console.error("Error deleting incident:", error);
      }
    }
  };

  // ✅ Fetch once when page loads
  useEffect(() => {
    fetchIncidents();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved": return "var(--success)";
      case "in-progress": return "var(--warning)";
      default: return "var(--danger)";
    }
  };

  return (
    <div>
      <Navbar role="admin" />
      <div className="dashboard-layout">
        <Sidebar role="admin" />
        <main className="main-content">
          <div className="page-header">
            <h1>Manage Incidents</h1>
            <p>Track and resolve reported incidents</p>
          </div>

          <div className="card">
            <h2>Reported Incidents</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Bus Number</th>
                  <th>Description</th>
                  <th>Reported By</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id}>
                    <td>{incident.busNumber}</td>
                    <td>{incident.description}</td>
                    <td>{incident.reportedBy}</td>
                    <td>{incident.date}</td>
                    <td>
                      <select
                        value={incident.status}
                        onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                        style={{
                          padding: '6px 12px',
                          border: '1px solid var(--gray)',
                          borderRadius: 'var(--border-radius)',
                          color: getStatusColor(incident.status),
                          fontWeight: '500',
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '6px 12px', fontSize: '14px' }}
                        onClick={() => handleDelete(incident.id)}
                      >
                        Delete
                      </button>
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

export default Incidents;
