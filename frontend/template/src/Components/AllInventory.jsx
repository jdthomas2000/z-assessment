import { useState, useEffect } from "react";
import HoverCard from "./HoverCard";

function AllInventory() {
  const [inventory, setInventory] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/inventory/`, {})
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error("error:", err));
  }, []);

  if (!inventory || inventory.length === 0)
    return <h1>No current inventory </h1>;

  return (
    <>
      <h1 className="text-2xl font-bold">Inventory - All Items</h1>
      <div>
        {inventory.map((item) => (
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

export default AllInventory;
