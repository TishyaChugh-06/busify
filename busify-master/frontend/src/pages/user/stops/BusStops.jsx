// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { stopsData } from "./stopsData";
// import Navbar from "../../../components/Navbar";
// import Sidebar from "../../../components/Sidebar";
// import "./BusStops.css";

// const BusStops = () => {
//   const { busNumber } = useParams();
//   const navigate = useNavigate();
//   const stops = stopsData[busNumber];

//   if (!stops) {
//     return (
//       <div className="error-page">
//         <h2>No stops found for Bus {busNumber}</h2>
//         <button onClick={() => navigate(-1)} className="btn">
//           Go Back
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
//           <header className="bus-header">
//             <h1>🚌 Bus {busNumber} Stops & Arrival Times</h1>
//             <p>View all stops along this route</p>
//           </header>
// <main className="main-content bus-stops-page">
//   <div className="bus-stops-container">
//     <h1>🚌 Bus {busNumber} Stops & Arrival Times</h1>
//     <table className="stops-table">
//       <thead>
//         <tr>
//           <th>Stop</th>
//           <th>Arrival Time</th>
//         </tr>
//       </thead>
//       <tbody>
//         {stops.map((stop, index) => (
//           <tr key={index}>
//             <td><strong>{stop.stop}</strong></td>
//             <td>{stop.time}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </main>
//       </div>
//     </div>
//   );
// };

// export default BusStops;



import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { stopsData } from "./stopsData";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import "./BusStops.css";

const BusStops = () => {
  const { busNumber } = useParams();
  const navigate = useNavigate();
  const stops = stopsData[busNumber];

  if (!stops) {
    return (
      <div className="error-page">
        <h2>No stops found for Bus {busNumber}</h2>
        <button onClick={() => navigate(-1)} className="btn">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />
        <main className="main-content bus-stops-page">
          <div className="bus-stops-container">
            <h1>🚌 Bus {busNumber} Stops & Arrival Times</h1>
            <p>View all stops along this route</p>

            <table className="stops-table">
              <thead>
                <tr>
                  <th>Stop</th>
                  <th>Arrival Time</th>
                </tr>
              </thead>
              <tbody>
                {stops.map((stop, index) => (
                  <tr key={index}>
                    <td><strong>{stop.stop}</strong></td>
                    <td>{stop.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="btn"
              style={{ marginTop: "20px" }}
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BusStops;
