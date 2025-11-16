// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './Sidebar.css';

// const Sidebar = ({ role }) => {
//   const location = useLocation();

//   const userLinks = [
//     { path: '/user/dashboard', label: 'Dashboard', icon: '📊' },
//     { path: '/user/live', label: 'Live Tracking', icon: '🗺️' },
//     { path: '/user/route', label: 'My Route', icon: '🚌' },
//     { path: '/user/notifications', label: 'Notifications', icon: '🔔' },
//     { path: '/user/payment', label: 'Payment', icon: '💳' },
//     { path: '/user/report', label: 'Report Incident', icon: '⚠️' },
//     { path: '/user/profile', label: 'Profile', icon: '👤' },
//   ];

//   const adminLinks = [
//     { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
//     { path: '/admin/buses', label: 'Manage Buses', icon: '🚌' },
//     { path: '/admin/routes', label: 'Manage Routes', icon: '🗺️' },
//     { path: '/admin/users', label: 'Manage Users', icon: '👥' },
//     { path: '/admin/notifications', label: 'Notifications', icon: '🔔' },
//     { path: '/admin/incidents', label: 'Incidents', icon: '⚠️' },
//     { path: '/admin/payments', label: 'Payments', icon: '💳' },
//     { path: '/admin/profile', label: 'Profile', icon: '👤' },
//   ];

//   const links = role === 'admin' ? adminLinks : userLinks;

//   return (
//     <aside className="sidebar">
//       <nav className="sidebar-nav">
//         {links.map((link) => (
//           <Link
//             key={link.path}
//             to={link.path}
//             className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
//           >
//             <span className="sidebar-icon">{link.icon}</span>
//             <span className="sidebar-label">{link.label}</span>
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ role }) => {
  const location = useLocation();

  const userLinks = [
    { path: '/user/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/user/live', label: 'Live Tracking', icon: '🗺️' },

    // swapped labels as requested:
    { path: '/user/route', label: 'Routes', icon: '🚌' },      // was "My Route"
    { path: '/user/routes', label: 'My Routes', icon: '📁' },  // was "Routes"

    { path: '/user/notifications', label: 'Notifications', icon: '🔔' },
    { path: '/user/payment', label: 'Payment', icon: '💳' },
    { path: '/user/report', label: 'Report Incident', icon: '⚠️' },
    { path: '/user/profile', label: 'Profile', icon: '👤' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/buses', label: 'Manage Buses', icon: '🚌' },
    { path: '/admin/routes', label: 'Manage Routes', icon: '🗺️' },
    { path: '/admin/users', label: 'Manage Users', icon: '👥' },
    { path: '/admin/notifications', label: 'Notifications', icon: '🔔' },
    { path: '/admin/incidents', label: 'Incidents', icon: '⚠️' },
    { path: '/admin/payments', label: 'Payments', icon: '💳' },
    { path: '/admin/profile', label: 'Profile', icon: '👤' },
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{link.icon}</span>
            <span className="sidebar-label">{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
