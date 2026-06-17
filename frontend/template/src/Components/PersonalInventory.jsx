import { useState, useEffect } from "react";
import HoverCard from "./HoverCard";
import AddItemModal from "./AddItemModal";
import ViewItemModal from "./ViewItemModal";

function Inventory() {
  const [userObj, setUserObj] = useState(null);
  const [userInventory, setUserInventory] = useState([]);
  const [itemData, setItemData] = useState(null);

  const localUsername = localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://localhost:8080/users/${localUsername}`)
      .then((res) => res.json())
      .then((data) => setUserObj(data))
      .catch((err) => console.error("error:", err));
  }, [localUsername]);

  function fetchInventory() {
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
  }

  useEffect(() => {
    fetchInventory();
  }, [userObj]);

  function openModal(item) {
    setItemData(item);
  }

  function closeModal() {
    setItemData(null);
  }

  if (!userObj || userObj.length === 0) return <h1>Loading...</h1>;
  if (!userInventory || userInventory.length === 0)
    return (
      <>
        <h1>No user inventory for current user </h1>
        <AddItemModal
          userID={userObj[0].id}
          onRefresh={fetchInventory}
        ></AddItemModal>
      </>
    );

  return (
    <>
      <h1>Personal Inventory</h1>
      <div>
        {userInventory.map((item) => (
          <HoverCard
            key={item.id}
            itemName={item.itemName}
            description={item.description}
            quantity={item.quantity}
            onClick={() => openModal(item)}
          ></HoverCard>
        ))}
      </div>

      <AddItemModal
        userID={userObj[0].id}
        onRefresh={fetchInventory}
      ></AddItemModal>

      {itemData && (
        <ViewItemModal
          item={itemData}
          onClose={closeModal}
          onRefresh={fetchInventory}
        ></ViewItemModal>
      )}
    </>
  );
}

export default Inventory;
