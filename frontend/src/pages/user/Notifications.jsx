// import React from 'react';
// import Navbar from '../../components/Navbar';
// import Sidebar from '../../components/Sidebar';
// import { mockNotifications } from '../../mockData';
// import './UserPages.css';

// const Notifications = () => {
//   const getNotificationColor = (type) => {
//     switch(type) {
//       case 'warning': return 'var(--warning)';
//       case 'alert': return 'var(--danger)';
//       default: return 'var(--primary)';
//     }
//   };

//   return (
//     <div>
//       <Navbar role="user" />
//       <div className="dashboard-layout">
//         <Sidebar role="user" />
//         <main className="main-content">
//           <div className="page-header">
//             <h1>Notifications</h1>
//             <p>Stay updated with latest announcements</p>
//           </div>
          
//           <div className="card">
//             <h2>All Notifications</h2>
//             <div className="notification-list">
//               {mockNotifications.map(notification => (
//                 <div key={notification.id} className="notification-item" style={{borderLeft: `4px solid ${getNotificationColor(notification.type)}`}}>
//                   <div className="notification-header">
//                     <strong>{notification.title}</strong>
//                     <span className="notification-date">{notification.date}</span>
//                   </div>
//                   <p>{notification.message}</p>
//                   <span style={{fontSize: '12px', color: getNotificationColor(notification.type), fontWeight: '500', textTransform: 'uppercase'}}>
//                     {notification.type}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Notifications;
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import './UserPages.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from JSON Server
  useEffect(() => {
    fetch('http://localhost:3001/notifications') // all admin notifications
      .then(res => res.json())
      .then(data => {
        setNotifications(data.reverse()); // show latest first
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getNotificationColor = (type) => {
    switch(type) {
      case 'warning': return 'var(--warning)';
      case 'alert': return 'var(--danger)';
      default: return 'var(--primary)';
    }
  };

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />
        <main className="main-content">
          <div className="page-header">
            <h1>Notifications</h1>
            <p>Stay updated with latest announcements from the admin</p>
          </div>

          <div className="card">
            <h2>All Notifications</h2>
            {notifications.length === 0 ? (
              <p>No notifications yet.</p>
            ) : (
              <div className="notification-list">
                {notifications.map(notification => (
                  <div key={notification.id} className="notification-item" style={{borderLeft: `4px solid ${getNotificationColor(notification.type)}`}}>
                    <div className="notification-header">
                      <strong>{notification.title}</strong>
                      <span className="notification-date">{notification.date}</span>
                    </div>
                    <p>{notification.message}</p>
                    <span style={{fontSize: '12px', color: getNotificationColor(notification.type), fontWeight: '500', textTransform: 'uppercase'}}>
                      {notification.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
