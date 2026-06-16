import { useState, useEffect } from "react";
import HoverCard from "./HoverCard";

function Inventory() {
  const [userObj, setUserObj] = useState(null);
  const [userInventory, setUserInventory] = useState([]);

  const localUsername = localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://localhost:8080/users/${localUsername}`)
      .then((res) => res.json())
      .then((data) => setUserObj(data))
      .catch((err) => console.error("error:", err));
  }, [localUsername]);

  useEffect(() => {
    if (!userObj || userObj.length === 0) return;
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/inventory/${userObj[0].id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserInventory(data))
      .catch((err) => console.error("error:", err));
  }, [userObj]);

  if (!userObj || userObj.length === 0) return <h1>Loading...</h1>;
  if (!userInventory)
    return <h1>No user inventory for current user {userObj.username}</h1>;

  return (
    <>
      <div>
        {userInventory.map((item) => (
          <HoverCard
            key={item.id}
            itemName={item.itemName}
            description={item.description}
            quantity={item.quantity}
          ></HoverCard>
        ))}
      </div>
    </>
  );
}

export default Inventory;
