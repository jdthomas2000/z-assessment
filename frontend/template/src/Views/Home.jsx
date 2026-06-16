import { useState, useEffect } from "react";
import "../App.css";

function Home() {
  const [person, setPerson] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => setPerson(data))
      .catch((err) => console.error("Backend not ready:", err));
  }, []);
  if (!person) return <h1>loading...</h1>;

  const username = localStorage.getItem("username");
  return (
    <>
      <div> Welcome {username}!</div>
      {person.map((data) => (
        <>
          <div key={data.id}>{data.username} </div>
        </>
      ))}
    </>
  );
}

export default Home;
