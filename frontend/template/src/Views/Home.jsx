import { useState, useEffect } from "react";
import "../App.css";

function Home() {
  const [person, setPerson] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((res) => res.json())
      .then((data) => setPerson(data))
      .catch((err) => console.error("Backend not ready:", err));
  }, []);
  if (!person) return <h1>loading...</h1>;
  return (
    <>
      {person.map((data) => (
        <>
          <div key={data.id}>{data.name} </div>
        </>
      ))}
    </>
  );
}

export default Home;
