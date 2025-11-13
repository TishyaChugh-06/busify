// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/Sidebar";
// import { mockRoutes } from "../../mockData";
// import "./UserPages.css";

// const RouteDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const route = mockRoutes.find((r) => r.id === parseInt(id));

//   if (!route) {
//     return (
//       <div className="card">
//         <h2>Route not found!</h2>
//         <button onClick={() => navigate(-1)} className="back-btn">
//           ← Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar role="user" />
//       <div className="dashboard-layout">
//         <Sidebar role="user" />
//         <main className="main-content">
//           <div className="page-header">
//             <h1>{route.name}</h1>
//             <p>Stops and route details</p>
//           </div>

//           <div className="card">
//             <button className="back-btn" onClick={() => navigate(-1)}>
//               ← Back
//             </button>
//             <p>
//               <strong>Duration:</strong> {route.duration}
//             </p>
//             <h3>Stops:</h3>
//             <ul className="stops-list">
//               {route.stops.map((stop, i) => (
//                 <li key={i}>
//                   <strong>Stop {i + 1}:</strong> {stop}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default RouteDetails;
