import React, { useState, useContext } from "react";
import { Context } from "../../Context.js";
import Button from "../Button/Button.jsx";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addProductToCart } = useContext(Context);

  return (
    <div className="product_card">
      <h2>{product.name}</h2>
      <div
        className="product_container"
        style={{ display: `flex`, flexDirection: `column` }}
      >
        <img src={product.imageURL} alt={product.description} />
        <div className="product_description_container">
          <div className="product_card_description">
            <p style={{ fontWeight: `600` }}>{product.description}</p>
          </div>
          <div className="product_card_price">
            <p style={{ display: `block` }}>{`MRP Rs.${product.price}`}</p>
            <Button
              content1={`Buy Now`}
              width="115px"
              onClick={() => addProductToCart(product)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
