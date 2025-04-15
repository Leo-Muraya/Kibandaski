import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { CartProvider } from "./CartContext"; // Assuming CartProvider is in CartContext.js
import App from "./App";
// import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your App with BrowserRouter */}
      <CartProvider> {/* Wrap your app with CartProvider for global cart state */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
