// import React from 'react';
// import Navbar from '../../components/Navbar';
// import Sidebar from '../../components/Sidebar';
// import { mockRoutes } from '../../mockData';
// import './UserPages.css';

// const MyRoute = () => {
//   const myRoute = mockRoutes[0]; // Assuming user is on Route A

//   return (
//     <div>
//       <Navbar role="user" />
//       <div className="dashboard-layout">
//         <Sidebar role="user" />
//         <main className="main-content">
//           <div className="page-header">
//             <h1>My Route</h1>
//             <p>View your assigned bus route and stops</p>
//           </div>
          
//           <div className="card">
//             <h2>{myRoute.name}</h2>
//             <div className="route-info">
//               <p><strong>Duration:</strong> {myRoute.duration}</p>
//               <p><strong>Total Stops:</strong> {myRoute.stops.length}</p>
//             </div>
            
//             <div className="route-info">
//               <h3>Bus Stops</h3>
//               <ul className="stops-list">
//                 {myRoute.stops.map((stop, index) => (
//                   <li key={index}>
//                     <strong>Stop {index + 1}:</strong> {stop}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
          
//           <div className="card">
//             <h2>All Available Routes</h2>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Route Name</th>
//                   <th>Stops</th>
//                   <th>Duration</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {mockRoutes.map(route => (
//                   <tr key={route.id}>
//                     <td><strong>{route.name}</strong></td>
//                     <td>{route.stops.length} stops</td>
//                     <td>{route.duration}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MyRoute;




// 



// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/Sidebar";
// import "./UserPages.css";
// import "./search.css";
// import "./buses.css";

// const MyRoute = () => {
//   const [destination, setDestination] = useState("");
//   const [error, setError] = useState("");
//   const [buses, setBuses] = useState([]);
//   const [page, setPage] = useState("search");

//   // 🔍 Fetch buses dynamically based on user input
//   const handleSearch = async () => {
//     const place = destination.trim().toLowerCase();
//     if (!place) {
//       setError("Please enter a destination!");
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:3001/buses?destination=${place}`);
//       const data = await res.json();

//       if (data.length > 0) {
//         setBuses(data);
//         setPage("buses");
//         setError("");
//       } else {
//         setError("No buses found for this destination!");
//       }
//     } catch {
//       setError("Error fetching bus data.");
//     }
//   };

//   // ✅ Search input page
//   const renderSearchPage = () => (
//     <main>
//       <div className="box">
//         <h2>Find Your Bus</h2>
//         <label>Enter Destination:</label>
//         <input
//           type="text"
//           placeholder="Add Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//         />
//         <button onClick={handleSearch}>Search</button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>
//     </main>
//   );

//   // ✅ Buses result page (dynamic)
//   const renderBusList = () => (
//     <main>
//       <h2>Buses Going to {destination.charAt(0).toUpperCase() + destination.slice(1)}</h2>
//       <button className="btn" style={{ marginBottom: "20px" }} onClick={() => setPage("search")}>
//         ← Back
//       </button>

//       <div className="bus-list">
//         {buses.map((bus) => (
//           <div key={bus.id} className="bus-box">
//             <h3>Bus No: {bus.busNo}</h3>
//             <button className="btn">View Stops</button>
//           </div>
//         ))}
//       </div>
//     </main>
//   );

//   return (
//     <div>
//       <Navbar role="user" />
//       <div className="dashboard-layout">
//         <Sidebar role="user" />
//         <main className="main-content">
//           <div className="page-header">
//             <h1>My Route</h1>
//             <p>Find your bus and view stops</p>
//           </div>
//           <div className="card">
//             {page === "search" ? renderSearchPage() : renderBusList()}
//           </div>
//         </main>
//       </div>
//       <footer>
//         <p>© 2025 University Bus Tracker</p>
//       </footer>
//     </div>
//   );
// };

// export default MyRoute;



// 















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/Sidebar";
// import "./UserPages.css";

// const MyRoute = () => {
//   const [destination, setDestination] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     const place = destination.trim().toLowerCase();
//     if (!place) {
//       setError("Please enter a destination!");
//     } else if (place === "ambala") {
//       navigate("/user/ambala-buses");
//     } else if (place === "patiala") {
//       navigate("/user/patiala-buses");
//     } else {
//       setError("No buses found for this destination!");
//     }
//   };

//   return (
//     <div>
//       <Navbar role="user" />
//       <div className="dashboard-layout">
//         <Sidebar role="user" />
//         <main className="main-content">
//           <div className="page-header">
//             <h1>Find Your Bus</h1>
//             <p>Search for buses by destination</p>
//           </div>
//           <div className="card">
//             <input
//               type="text"
//               placeholder="Enter destination"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             />
//             <button onClick={handleSearch}>Search</button>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MyRoute;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./UserPages.css";

const MyRoute = () => {
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const place = destination.trim().toLowerCase();
    if (!place) {
      setError("Please enter a destination!");
    } else if (place === "ambala") {
      navigate("/user/ambala-buses");
    } else if (place === "patiala") {
      navigate("/user/patiala-buses");
    } else {
      setError("No buses found for this destination!");
    }
  };

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />
        <main className="main-content route-page">
          <div className="search-card">
            <h1>Find Your Bus</h1>
            <p>Enter Destination:</p>
            <input
              type="text"
              placeholder="Add Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p className="error-text">{error}</p>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyRoute;
