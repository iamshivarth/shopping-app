import React, { useState, useRef, useEffect, useContext } from "react";
import { Context } from "../../Context";
import "./TextInput.css";

const TextInput = ({ name, id, type, value, placeholder, title, error }) => {
  const { handleInputChange } = useContext(Context);
  const inputRef = useRef();

  const [isClicked, setIsClicked] = useState(false);

  useEffect((e) => {
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (!inputRef.current.contains(e.target)) setIsClicked(false);
    else setIsClicked(true);
  };

  const handleChange = (e) => {
    // onChange(e, title, setText);
    handleInputChange(e, title);
  };

  return (
    <div className="text_input_container">
      <label htmlFor={id} style={{ display: isClicked ? "block" : "none" }}>
        {name}
      </label>
      <input
        aria-describedby="text_input_error"
        autoComplete="off"
        ref={inputRef}
        style={{
          borderBottom: isClicked ? `2px #50dae3 solid` : `2px lightgray solid`,
        }}
        id={id}
        type={
          id === "password" || id === "confirmPassword" ? "password" : "text"
        }
        value={value}
        onClick={handleClick}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <p id="text_input_error" style={{ color: "Red", fontWeight: "600" }}>
        {error}
      </p>
    </div>
  );
};

export default TextInput;
