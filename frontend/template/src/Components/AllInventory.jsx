import { useState, useEffect } from "react";
import HoverCard from "./HoverCard";
import OnlyViewItemModal from "./OnlyViewModal";

function AllInventory() {
  const [inventory, setInventory] = useState([]);
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/inventory/`, {})
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error("error:", err));
  }, []);

  function openModal(item) {
    setItemData(item);
  }

  function closeModal() {
    setItemData(null);
  }

  const localUser = localStorage.getItem("username");

  if (!inventory || inventory.length === 0)
    return <h1>No current inventory </h1>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-3">Inventory - All Items</h1>
      <span className="text-1xl font-bold mb-2">
        Welcome {localUser ? localUser : "guest"}! This page displays all of the
        items created by every inventory manager.
      </span>
      <div>
        {inventory.map((item) => (
          <HoverCard
            key={item.id}
            itemName={item.itemName}
            description={item.description}
            quantity={item.quantity}
            onClick={() => openModal(item)}
          ></HoverCard>
        ))}
      </div>

      {itemData && (
        <OnlyViewItemModal
          item={itemData}
          onClose={closeModal}
        ></OnlyViewItemModal>
      )}
    </>
  );
}

export default AllInventory;
