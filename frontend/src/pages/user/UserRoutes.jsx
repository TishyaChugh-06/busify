import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { mockRoutes } from '../../mockData';
import './UserPages.css';

const UserRoutes = () => {
  const myRoute = mockRoutes[0]; // Example: Assigned Route A

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />

        <main className="main-content">

          {/* Page Header */}
          <div className="page-header">
            <h1>Routes</h1>
            <p>View your assigned route and all available bus routes</p>
          </div>

          {/* Assigned Route Section */}
          <div className="card">
            <h2>Assigned Route: {myRoute.name}</h2>

            <div className="route-info">
              <p><strong>Duration:</strong> {myRoute.duration}</p>
              <p><strong>Total Stops:</strong> {myRoute.stops.length}</p>
            </div>

            <div className="route-info">
              <h3>Bus Stops</h3>
              <ul className="stops-list">
                {myRoute.stops.map((stop, index) => (
                  <li key={index}>
                    <strong>Stop {index + 1}:</strong> {stop}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* All Routes */}
          <div className="card">
            <h2>All Available Routes</h2>

            <table className="table">
              <thead>
                <tr>
                  <th>Route Name</th>
                  <th>Stops</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {mockRoutes.map(route => (
                  <tr key={route.id}>
                    <td><strong>{route.name}</strong></td>
                    <td>{route.stops.length} stops</td>
                    <td>{route.duration}</td>
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

export default UserRoutes;
