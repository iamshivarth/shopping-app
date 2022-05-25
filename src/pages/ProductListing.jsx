import React from "react";
import CategoriesList from "../components/CategoriesList/CategoriesList.jsx";
import Products from "../components/Products/Products.jsx";

const ProductListing = () => {
  return (
    <div className="plp" style={{ display: "flex", position: "relative" }}>
      <CategoriesList />
      <Products />
    </div>
  );
};

export default ProductListing;
