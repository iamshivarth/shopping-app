import React from "react";

const Button = ({
  content1,
  content2,
  width,
  height,
  borderRadius,
  onClick,
  display,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: width ? width : `100%`,
        height: height ? height : "20px",
        border: "none",
        display: display ? display : "flex",
        justifyContent: content2 ? `space-between` : `center`,
        alignItems: "center",
        color: "#fff",
        backgroundColor: "#D00256",
        padding: "20px",
        borderRadius: !borderRadius ? "3px" : "50%",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      <p>{content1}</p>
      <p>{content2}</p>
    </button>
  );
};

export default Button;
