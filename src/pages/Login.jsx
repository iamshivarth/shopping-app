import React from "react";
import User from "../components/User/User.jsx";
import { login } from "../../static/static.js";

const Login = () => {
  return <User feature={login} />;
};

export default Login;
