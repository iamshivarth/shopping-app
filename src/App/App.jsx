import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "../Context.js";
import Navbar from "../components/Navbar/Navbar.jsx";
import Homepage from "../pages/Homepage.jsx";
import ProductListing from "../pages/ProductListing.jsx";
import MyCart from "../components/MyCart/MyCart.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import "./App.css";

const overlayStyles = {
  position: "fixed",
  top: "0",
  left: "0",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  width: "100%",
  height: "100vh",
};

const App = () => {
  const { cartOpen, isSignupSubmitted } = useContext(Context);

  return (
    <div className="app">
      <header>
        <Navbar />
      </header>
      <section>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductListing />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
        {cartOpen && (
          <div className="cart_overlay" style={overlayStyles}>
            <MyCart />
          </div>
        )}
      </section>
      <footer>
        <div className="copyright">{process.env.FOOTER}</div>
      </footer>
    </div>
  );
};

export default App;
