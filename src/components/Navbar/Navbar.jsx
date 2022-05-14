import React from "react";
import SBLogo from "../../../static/images/logo.png";
import SBCart from "../../../static/images/cart.svg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="nav_bar">
        <div className="nav_left">
          <img src={SBLogo} alt="Sabka Bazaar Logo" />
        </div>
        <ul className="nav_center">
          <li>Home</li>
          <li>Products</li>
        </ul>
        <div className="nav_right">
          <ul className="user">
            <li>Signin</li>
            <li>Register</li>
          </ul>
          <div className="cart">
            <img src={SBCart} alt="Sabka Bazaar Cart" width="30px" />
            <h1>{0} items</h1>
          </div>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
