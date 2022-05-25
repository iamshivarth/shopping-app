import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SBLogo from "../../../static/images/logo.png";
import SBCart from "../../../static/images/cart.svg";
import "./Navbar.css";
import { Context } from "../../Context";

const Navbar = () => {
  const {
    setCartOpen,
    totalProductsInCart,
    loggedInUser,
    handleProductsClick,
  } = useContext(Context);
  return (
    <>
      <nav className="nav_bar">
        <div className="nav_left">
          <img src={SBLogo} alt="Sabka Bazaar Logo" />
        </div>
        <ul className="nav_center">
          <li>
            <Link to="/">{"Home"}</Link>
          </li>
          <li>
            <Link to="/products" onClick={handleProductsClick}>
              {"Products"}
            </Link>
          </li>
        </ul>
        <div className="nav_right">
          <ul className="user">
            {loggedInUser ? (
              <>
                <li>{loggedInUser.firstName + " " + loggedInUser.lastName}</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signin">{"Signin"}</Link>
                </li>
                <li>
                  <Link to="/register">{"Register"}</Link>
                </li>
              </>
            )}
          </ul>
          <div
            className="cart"
            style={{ cursor: "pointer" }}
            onClick={() => setCartOpen(true)}
          >
            <img src={SBCart} alt="Sabka Bazaar Cart" width="30px" />
            <h1>
              {totalProductsInCart}
              {" item"}
              {/* {totalProductsInCart === 0 ? `item` : `items`} */}
            </h1>
          </div>
        </div>
      </nav>
      <hr className="navbar_hr"></hr>
    </>
  );
};

export default Navbar;
