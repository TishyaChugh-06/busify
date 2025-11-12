import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import LiveTracking from './pages/user/LiveTracking';
import MyRoute from './pages/user/MyRoute';
import UserNotifications from './pages/user/Notifications';
import Payment from './pages/user/Payment';
import IncidentReport from './pages/user/IncidentReport';
import UserProfile from './pages/user/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Buses from './pages/admin/Buses';
import Routes from './pages/admin/Routes';
import Users from './pages/admin/Users';
import AdminNotifications from './pages/admin/Notifications';
import Incidents from './pages/admin/Incidents';
import AdminPayments from './pages/admin/Payments';
import AdminProfile from './pages/admin/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/user/dashboard',
    element: <UserDashboard />,
  },
  {
    path: '/user/live',
    element: <LiveTracking />,
  },
  {
    path: '/user/route',
    element: <MyRoute />,
  },
  {
    path: '/user/notifications',
    element: <UserNotifications />,
  },
  {
    path: '/user/payment',
    element: <Payment />,
  },
  {
    path: '/user/report',
    element: <IncidentReport />,
  },
  {
    path: '/user/profile',
    element: <UserProfile />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/buses',
    element: <Buses />,
  },
  {
    path: '/admin/routes',
    element: <Routes />,
  },
  {
    path: '/admin/users',
    element: <Users />,
  },
  {
    path: '/admin/notifications',
    element: <AdminNotifications />,
  },
  {
    path: '/admin/incidents',
    element: <Incidents />,
  },
  {
    path: '/admin/payments',
    element: <AdminPayments />,
  },
  {
    path: '/admin/profile',
    element: <AdminProfile />,
  },
]);

export default router;
