import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handleUser(e) {
    setUser(e.target.value);
  }
  function handlePass(e) {
    setPass(e.target.value);
  }

  async function handleLogin() {
    try {
      const loginData = { user: user, password: pass };
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.status === 201) {
        console.log("logged in", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", user);
        navigate(`/inventory/${user}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="username"
        className="input input-neutral"
        value={user}
        onChange={handleUser}
      />
      <input
        type="password"
        placeholder="password"
        className="input input-primary"
        value={pass}
        onChange={handlePass}
      />
      <Link to="/register">
        <button className="btn btn-primary">Register</button>
      </Link>

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </>
  );
}

export default Login;
