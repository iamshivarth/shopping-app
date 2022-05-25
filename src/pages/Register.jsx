import React from "react";
import User from "../components/User/User.jsx";
import { register } from "../../static/static.js";

const Login = () => {
  return <User feature={register} />;
};

export default Login;
