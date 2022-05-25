import React, { useState, useEffect, useContext } from "react";
import CartCard from "../CartCard/CartCard.jsx";
import Button from "../Button/Button.jsx";
import "./MyCart.css";
import { Context } from "../../Context.js";

const cartStyles = {
  header: { color: `#fff`, backgroundColor: `#000` },
};

const MyCart = () => {
  const { cartProducts, setCartOpen, totalProductsInCart } =
    useContext(Context);
  const totalCartValue = cartProducts.reduce((total, cartProduct) => {
    return total + cartProduct.qty * cartProduct.price;
  }, 0);

  return (
    <div className="cart_container">
      <div className="cart_header" style={cartStyles.header}>
        <p>
          My Cart
          <span style={{ fontSize: `1rem` }}>
            {" "}
            ({totalProductsInCart} item)
          </span>
        </p>
        <p style={{ cursor: "pointer" }} onClick={() => setCartOpen(false)}>
          X
        </p>
      </div>
      <div
        className="cart_body"
        style={{ padding: `${totalProductsInCart === 0 ? "0" : "10px"}` }}
      >
        <div className="cart_card_container">
          {cartProducts.map((cartProduct) => (
            <CartCard key={cartProduct.id} item={cartProduct} />
          ))}
        </div>

        <div
          className="cart_tagline"
          style={{
            display: `${totalProductsInCart === 0 && "none"}`,
          }}
        >
          <img
            src="/static/images/lowest-price.png"
            alt="Lowest Price Guaranteeed"
          />
          <p
            style={{
              marginLeft: "30px",
              fontWeight: "600",
            }}
          >
            You won't find it cheaper anywhere
          </p>
        </div>
        {totalProductsInCart === 0 && (
          <div className="cart_no_items">
            <p style={{ fontWeight: "700" }}>No items in your cart</p>
            <p>Your favourite items are just a click away</p>
          </div>
        )}
      </div>

      <div className="cart_footer">
        <p
          style={{
            fontWeight: "600",
            display: `${totalProductsInCart === 0 && "none"}`,
          }}
        >
          Promo code can be applied on payment page
        </p>
        <Button
          onClick={() => setCartOpen(false)}
          content1="Proceed to Checkout"
          content2={`Rs.${totalCartValue}   >`}
          width="100%"
          display={totalProductsInCart === 0 && "none"}
        />
        <Button
          onClick={() => setCartOpen(false)}
          content1={`Start Shopping`}
          display={totalProductsInCart !== 0 && "none"}
        />
      </div>
    </div>
  );
};

export default MyCart;
