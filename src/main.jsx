import React from "react";
import ReactDOM from "react-dom/client"; //library used for browser interface
//react native can be used for mobile app developement as well as for the desktop application
import App from "./App.jsx";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SpeedInsights />
    <App />
  </React.StrictMode> //all the react tags are called components
);
