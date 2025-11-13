// import React from 'react';
// import Navbar from '../../components/Navbar';
// import Sidebar from '../../components/Sidebar';
// import { mockNotifications, mockBuses } from '../../mockData';
// import './UserPages.css';

// const Dashboard = () => {
//   return (
//     <div>
//       <Navbar role="user" />
//       <div className="dashboard-layout">
//         <Sidebar role="user" />
//         <main className="main-content">
//           <div className="page-header">
//             <h1>Dashboard</h1>
//             <p>Welcome to your bus management dashboard</p>
//           </div>
          
//           <div className="stats-grid">
//             <div className="stat-card">
//               <div className="stat-icon" style={{backgroundColor: '#E3F2FD'}}>🚌</div>
//               <div className="stat-content">
//                 <h3>Active Buses</h3>
//                 <p className="stat-number">{mockBuses.filter(b => b.status === 'active').length}</p>
//               </div>
//             </div>
            
//             <div className="stat-card">
//               <div className="stat-icon" style={{backgroundColor: '#FFF3E0'}}>🗺️</div>
//               <div className="stat-content">
//                 <h3>Your Route</h3>
//                 <p className="stat-number">Route A</p>
//               </div>
//             </div>
            
//             <div className="stat-card">
//               <div className="stat-icon" style={{backgroundColor: '#E8F5E9'}}>✅</div>
//               <div className="stat-content">
//                 <h3>Pass Status</h3>
//                 <p className="stat-number">Active</p>
//               </div>
//             </div>
            
//             <div className="stat-card">
//               <div className="stat-icon" style={{backgroundColor: '#FCE4EC'}}>🔔</div>
//               <div className="stat-content">
//                 <h3>Notifications</h3>
//                 <p className="stat-number">{mockNotifications.length}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="dashboard-grid">
//             <div className="card">
//               <h2>Recent Notifications</h2>
//               <div className="notification-list">
//                 {mockNotifications.slice(0, 3).map(notification => (
//                   <div key={notification.id} className="notification-item">
//                     <div className="notification-header">
//                       <strong>{notification.title}</strong>
//                       <span className="notification-date">{notification.date}</span>
//                     </div>
//                     <p>{notification.message}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="card">
//               <h2>Quick Actions</h2>
//               <div className="quick-actions">
//                 <a href="/user/live" className="action-btn">
//                   <span>🗺️</span>
//                   <span>Track Bus</span>
//                 </a>
//                 <a href="/user/payment" className="action-btn">
//                   <span>💳</span>
//                   <span>Make Payment</span>
//                 </a>
//                 <a href="/user/report" className="action-btn">
//                   <span>⚠️</span>
//                   <span>Report Issue</span>
//                 </a>
//                 <a href="/user/route" className="action-btn">
//                   <span>🚌</span>
//                   <span>View Route</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import './UserPages.css';

const Dashboard = () => {
  const [buses, setBuses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 1; // replace with logged-in user id
  const userRoute = "Route A"; // fetch this from user profile if needed

  // Fetch buses and notifications
  const fetchData = () => {
    setLoading(true);

    // Active buses
    fetch('http://localhost:3001/buses')
      .then(res => res.json())
      .then(data => setBuses(data))
      .catch(err => console.error(err));

    // Notifications
    fetch('http://localhost:3001/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data.reverse())) // latest first
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  // Initial fetch + interval for real-time updates
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // fetch every 5 seconds
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />
        <main className="main-content">
          <div className="page-header">
            <h1>Dashboard</h1>
            <p>Welcome to your bus management dashboard</p>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{backgroundColor: '#E3F2FD'}}>🚌</div>
              <div className="stat-content">
                <h3>Active Buses</h3>
                <p className="stat-number">{buses.filter(b => b.status === 'active').length}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{backgroundColor: '#FFF3E0'}}>🗺️</div>
              <div className="stat-content">
                <h3>Your Route</h3>
                <p className="stat-number">{userRoute}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{backgroundColor: '#E8F5E9'}}>✅</div>
              <div className="stat-content">
                <h3>Pass Status</h3>
                <p className="stat-number">Active</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{backgroundColor: '#FCE4EC'}}>🔔</div>
              <div className="stat-content">
                <h3>Notifications</h3>
                <p className="stat-number">{notifications.length}</p>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            <div className="card">
              <h2>Recent Notifications</h2>
              {notifications.length === 0 ? (
                <p>No notifications yet.</p>
              ) : (
                <div className="notification-list">
                  {notifications.slice(0, 3).map(notification => (
                    <div key={notification.id} className="notification-item">
                      <div className="notification-header">
                        <strong>{notification.title}</strong>
                        <span className="notification-date">{notification.date}</span>
                      </div>
                      <p>{notification.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card">
              <h2>Quick Actions</h2>
              <div className="quick-actions">
                <a href="/user/live" className="action-btn">
                  <span>🗺️</span>
                  <span>Track Bus</span>
                </a>
                <a href="/user/payment" className="action-btn">
                  <span>💳</span>
                  <span>Make Payment</span>
                </a>
                <a href="/user/report" className="action-btn">
                  <span>⚠️</span>
                  <span>Report Issue</span>
                </a>
                <a href="/user/route" className="action-btn">
                  <span>🚌</span>
                  <span>View Route</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
