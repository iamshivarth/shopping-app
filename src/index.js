import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./Context.js";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App/App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider>
      <App />
    </Provider>
  </Router>
);
