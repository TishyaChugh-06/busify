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
//         <main className="main-content route-page">
//           <div className="search-card">
//             <h1>Find Your Bus</h1>
//             <p>Enter Destination:</p>
//             <input
//               type="text"
//               placeholder="Add Destination"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             />
//             <button onClick={handleSearch}>Search</button>
//             {error && <p className="error-text">{error}</p>}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MyRoute;
// // testing git change
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
// testing git change