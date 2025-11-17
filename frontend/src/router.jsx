
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// ================= AUTH =================
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ================= USER PAGES =================
import UserDashboard from "./pages/user/Dashboard";
import LiveTracking from "./pages/user/LiveTracking";
import MyRoute from "./pages/user/MyRoute"; // ✅ MyRoute
import UserRoutes from "./pages/user/UserRoutes"; // ✅ UserRoutes
import AmbalaBuses from "./pages/user/AmbalaBuses";
import PatialaBuses from "./pages/user/PatialaBuses";
import BusStops from "./pages/user/stops/BusStops";
import UserNotifications from "./pages/user/Notifications";
import Payment from "./pages/user/Payment";
import PaymentGateway from "./pages/user/PaymentGateway";
import IncidentReport from "./pages/user/IncidentReport";
import UserProfile from "./pages/user/Profile";

// ================= ADMIN PAGES =================
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBuses from "./pages/admin/Buses";
import AdminRoutes from "./pages/admin/Routes";
import Users from "./pages/admin/Users";
import AdminNotifications from "./pages/admin/Notifications";
import Incidents from "./pages/admin/Incidents";
import AdminPayments from "./pages/admin/Payments";
import AdminProfile from "./pages/admin/Profile";

const router = createBrowserRouter([
  // ===== AUTH =====
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },

  // ===== USER =====
  { path: "/user/dashboard", element: <UserDashboard /> },
  { path: "/user/live", element: <LiveTracking /> },

  // ✅ USER ROUTES
  { path: "/user/route", element: <MyRoute /> },       // Single selected route
  { path: "/user/routes", element: <UserRoutes /> },   // All routes overview
  { path: "/user/ambala-buses", element: <AmbalaBuses /> },
  { path: "/user/patiala-buses", element: <PatialaBuses /> },
  { path: "/user/stops/:busNumber", element: <BusStops /> },

  { path: "/user/notifications", element: <UserNotifications /> },
  { path: "/user/payment", element: <Payment /> },
  { path: "/user/payment-gateway", element: <PaymentGateway /> },
  { path: "/user/report", element: <IncidentReport /> },
  { path: "/user/profile", element: <UserProfile /> },

  // ===== ADMIN =====
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/buses", element: <AdminBuses /> },
  { path: "/admin/routes", element: <AdminRoutes /> },
  { path: "/admin/users", element: <Users /> },
  { path: "/admin/notifications", element: <AdminNotifications /> },
  { path: "/admin/incidents", element: <Incidents /> },
  { path: "/admin/payments", element: <AdminPayments /> },
  { path: "/admin/profile", element: <AdminProfile /> },
]);

export default router;
