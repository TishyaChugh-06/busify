// import React from "react";
// import ReactDOM from "react-dom/client";
// import "@/index.css";
// import App from "@/App";

// ReactDOM.createRoot(document.getElementById("root")).render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router"; // ✅ make sure this path is correct
import "./index.css"; // ✅ adjust if you’re using alias (@)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


