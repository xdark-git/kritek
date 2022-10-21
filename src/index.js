import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { reduxApi } from "./api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider api={reduxApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
