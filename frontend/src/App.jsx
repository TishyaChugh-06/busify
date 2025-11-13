// import React from 'react';
// import { RouterProvider } from 'react-router-dom';
// import router from './router';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router"; // ✅ adjust if router.jsx is in the same folder

function App() {
  return <RouterProvider router={router} />;
}

export default App;
