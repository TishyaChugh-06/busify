import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { mockNotifications } from '../../mockData';
import './UserPages.css';

const Notifications = () => {
  const getNotificationColor = (type) => {
    switch(type) {
      case 'warning': return 'var(--warning)';
      case 'alert': return 'var(--danger)';
      default: return 'var(--primary)';
    }
  };

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />
        <main className="main-content">
          <div className="page-header">
            <h1>Notifications</h1>
            <p>Stay updated with latest announcements</p>
          </div>
          
          <div className="card">
            <h2>All Notifications</h2>
            <div className="notification-list">
              {mockNotifications.map(notification => (
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
