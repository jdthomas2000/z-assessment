import { useState, useEffect } from "react";
import "../App.css";

function Login() {
  return (
    <>
      <h1>Login</h1>

      <input type="text" placeholder="Username" className="input" />
      <input type="text" placeholder="Password" className="input" />
    </>
  );
}

export default Login;
