import React, { useContext } from "react";
import { Context } from "../../Context.js";
import Button from "../Button/Button.jsx";

import "./CartCard.css";

const CartCard = ({ item }) => {
  const { addProductToCart, removeProductFromCart } = useContext(Context);
  const { imageURL, description, name, qty, price } = item;
  return (
    <div className="cart_card">
      <img src={imageURL} alt={description} />
      <div className="cart_card_description">
        <p>{name}</p>
        <div className="cart_modify_container">
          <div className="cart_card_qty">
            {/* Circular Button */}
            <Button
              onClick={() => removeProductFromCart(item)}
              content1="-"
              borderRadius={"50%"}
              height="10px"
              width="10px"
            />
            <p>{qty}</p>
            {/* Circular Button */}
            <Button
              onClick={() => addProductToCart(item)}
              content1="+"
              borderRadius={"50%"}
              height="5px"
              width="5px"
            />
            <p>x</p>
            <p>Rs.{price}</p>
          </div>
          <p>Rs.{price * qty}</p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
