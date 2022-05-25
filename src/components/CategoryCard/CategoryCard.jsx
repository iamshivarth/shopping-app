import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context.js";
import Button from "../Button/Button.jsx";
import "./CategoryCard.css";

const styles = {
  alternate: { "&:hover": { flexDirection: "row-reverse" } },
};

const CategoryCard = ({ category }) => {
  const { handleCategoryClick } = useContext(Context);
  return (
    <div className="ctg_card">
      <hr />
      <div
        className="category_card"
        style={{ flexDirection: category.order % 2 !== 0 && `row-reverse` }}
      >
        <div className="card_content">
          <h2>{category.name}</h2>
          <p>{category.description}</p>
          <Link to={`/products/${category.id}`}>
            <Button
              content1={`Explore ${category.key}`}
              width="auto"
              onClick={() => handleCategoryClick(category)}
            />
          </Link>
        </div>
        <img src={category.imageUrl} alt={category.description} />
      </div>
    </div>
  );
};

export default CategoryCard;
