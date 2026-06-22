import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [toast, setToast] = useState("");
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
        setToast("success");
        navigate(`/inventory/${user}`);
      } else if (response.status === 400) {
        setToast("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-start items-center bg-base-100 p-4 mt-40">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-4 border border-gray-300 rounded-lg p-4 ">
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
              className="input input-neutral"
              value={pass}
              onChange={handlePass}
            />

            <button className="btn btn-secondary" onClick={handleLogin}>
              Login
            </button>
          </div>

          <Link
            to="/register"
            className="text-sm text-blue-500 hover:text-blue-700 hover:underline cursor-pointer block mt-4"
          >
            <div>No Account? Register Here</div>
          </Link>
        </div>
      </div>

      {toast === "success" && (
        <div className="toast">
          <div className="alert alert-success">
            <span>{user} logged in.</span>
          </div>
        </div>
      )}
      {toast === "error" && (
        <div className="toast">
          <div className="alert alert-error">
            <span>Log in failed.</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
