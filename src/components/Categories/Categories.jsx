import React, { useContext } from "react";
import { Context } from "../../Context.js";
import CategoryCard from "../CategoryCard/CategoryCard.jsx";
import "./Categories.css";

const Categories = () => {
  const { categories } = useContext(Context);
  categories.sort((a, b) => a.order - b.order);

  return (
    <div className="categories">
      {categories
        .filter((category) => category.order >= 0)
        .map((category) => {
          // console.log(category);
          return <CategoryCard key={category.id} category={category} />;
        })}
    </div>
  );
};

export default Categories;
