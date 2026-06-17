import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const navigate = useNavigate();

  function handleUser(e) {
    setUser(e.target.value);
  }
  function handlePass(e) {
    setPass(e.target.value);
  }
  function handleFirst(e) {
    setFirst(e.target.value);
  }
  function handleLast(e) {
    setLast(e.target.value);
  }

  async function handleSubmit() {
    try {
      const regiestrationData = {
        first: first,
        last: last,
        user: user,
        password: pass,
      };
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regiestrationData),
      });
      const data = await response.json();

      if (response.status === 201) {
        console.log("registered", data);
        navigate("/login");
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
              placeholder="first name"
              className="input input-neutral"
              value={first}
              onChange={handleFirst}
            />
            <input
              type="text"
              placeholder="last name"
              className="input input-neutral"
              value={last}
              onChange={handleLast}
            />
            <input
              type="text"
              placeholder="username"
              className="input input-neutral"
              value={user}
              onChange={handleUser}
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="password"
              className="input input-neutral"
              value={pass}
              onChange={handlePass}
              autoComplete="new-password"
            />

            <button
              className="btn btn-active btn-secondary"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
