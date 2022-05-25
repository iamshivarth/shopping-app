import React, { useContext } from "react";
import Button from "../Button/Button.jsx";
import TextInput from "../TextInput/TextInput.jsx";

import "./User.css";
import { Context } from "../../Context.js";

const User = ({ feature }) => {
  const {
    handleFormSubmit,
    loginData,
    signupData,
    signupErrData,
    loginErrData,
  } = useContext(Context);
  const { title, about, fields } = feature;

  return (
    <div className="user_container">
      <div className="user_feature">
        <p>{title}</p>
        <p>{about}</p>
      </div>
      <form
        className="user_fields_container"
        onSubmit={(e) => handleFormSubmit(e, title)}
      >
        {fields.map(({ name, id, type }) => (
          <TextInput
            key={id}
            name={name}
            id={id}
            value={title === "Signup" ? signupData[id] : loginData[id]}
            placeholder={name}
            type={type}
            title={title}
            error={title === "Signup" ? signupErrData[id] : loginErrData[id]}
          />
        ))}
        <Button content1={feature.title} />
      </form>
    </div>
  );
};

export default User;
