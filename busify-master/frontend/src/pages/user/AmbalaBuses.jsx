// import React from "react";
// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/Sidebar";
// import "./UserPages.css";


// const AmbalaBuses = () => {
//   const buses = ["201", "202", "203", "204"];

//   return (
//     <div>
//       <Navbar role="user" />
//       <div className="dashboard-layout">
//         <Sidebar role="user" />
//         <main className="main-content bus-page">
//   <div className="bus-list">
//     {buses.map((num) => (
//       <div key={num} className="bus-box">
//         <h3>Bus No: {num}</h3>
//         <button className="btn">View Stops</button>
//       </div>
//     ))}


//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AmbalaBuses;




import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./UserPages.css";

const AmbalaBuses = () => {
  const buses = ["101", "102", "103", "104"];
  const navigate = useNavigate();

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />
        <main className="main-content">
          <h2>Buses Going to Ambala</h2>
          <div className="bus-list">
            {buses.map((num) => (
              <div key={num} className="bus-box">
                <h3>Bus No: {num}</h3>
                <button className="btn" onClick={() => navigate(`/user/stops/${num}`)}>
                  View Stops
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AmbalaBuses;
