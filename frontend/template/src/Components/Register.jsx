import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handleUser(e) {
    setUser(e.target.value);
  }
  function handlePass(e) {
    setPass(e.target.value);
  }

  async function handleSubmit() {
    try {
      const regiestrationData = { user: user, password: pass };
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
      <div>Registration Page</div>
      <span>create new user by inputting username and password</span>
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

      <button className="btn btn-active btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}

export default Register;
