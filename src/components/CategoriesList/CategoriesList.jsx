import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../Context";

const CategoriesList = () => {
  const { categories, handleCategoryClick } = useContext(Context);

  categories.sort((a, b) => a.order - b.order);

  return (
    <div style={{ backgroundColor: "#E9E7E7" }}>
      {categories
        .filter((category) => category.order >= 0)
        .map((category) => {
          return (
            <Link
              to={category.enabled ? "/products" : `/products/${category.id}`}
              key={category.id}
            >
              <div
                onClick={() => handleCategoryClick(category, "PLP")}
                className="plp_category"
                style={{
                  cursor: "pointer",
                  color: "gray",
                  background: `${category.enabled ? "#fff" : "#E9E7E7"}`,
                  padding: "15px 15px",
                  width: "260px",
                  borderBottom: "2px solid lightgray",
                }}
              >
                {category.name}
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default CategoriesList;
