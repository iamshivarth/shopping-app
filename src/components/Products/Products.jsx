import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard.jsx";
import MyCart from "../MyCart/MyCart.jsx";

import "./Products.css";
import { Context } from "../../Context.js";

const Products = () => {
  const { products, filteredProducts } = useContext(Context);
  const { id } = useParams();
  let showProducts = id ? filteredProducts : products;
  return (
    <>
      <div className="products">
        {showProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

// Products.defaultProps = {
//   products: products,
// };

export default Products;
