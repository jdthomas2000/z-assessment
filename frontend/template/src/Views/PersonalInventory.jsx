import { useState, useEffect } from "react";
import HoverCard from "../Components/HoverCard";
import AddItemModal from "../Components/AddItemModal";
import ViewItemModal from "../Components/ViewEditItemModal";

function Inventory() {
  const [userObj, setUserObj] = useState(null);
  const [userInventory, setUserInventory] = useState([]);
  const [itemData, setItemData] = useState(null);
  const [addModal, setAddModal] = useState(false);

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

  function openEditModal(item) {
    setItemData(item);
  }

  function closeEditModal() {
    setItemData(null);
  }

  function openAddModal() {
    setAddModal(true);
  }

  function closeAddModal() {
    setAddModal(false);
  }

  if (!localStorage.getItem("username"))
    return (
      <h1 className="text-2xl font-bold">
        Please log in to view personal items
      </h1>
    );

  if (!userObj || userObj.length === 0) return <h1>Loading...</h1>;
  if (!userInventory || userInventory.length === 0)
    return (
      <>
        <div className="flex items-center mt-4">
          <h1 className="text-2xl font-bold">
            No user inventory for current user{" "}
          </h1>
          <button className="btn ml-5" onClick={() => openAddModal()}>
            Add Item
          </button>
          {addModal && (
            <AddItemModal
              userID={userObj[0].id}
              onRefresh={fetchInventory}
              onClose={closeAddModal}
            ></AddItemModal>
          )}
        </div>
      </>
    );

  return (
    <>
      <div className="flex items-center mt-4">
        <h1 className="text-2xl font-bold">Personal Inventory</h1>
        <button className="btn btn-neutral ml-5" onClick={() => openAddModal()}>
          Add Item
        </button>
        {addModal && (
          <AddItemModal
            userID={userObj[0].id}
            onRefresh={fetchInventory}
            onClose={closeAddModal}
          ></AddItemModal>
        )}
      </div>

      <span className="text-1xl font-bold mt-3">
        {" "}
        Welcome {userObj[0].username}! This page displays all of the items
        created by you. Click on the card(s) to view/edit/delete each item.
        Click the add button to add a new item.
      </span>

      <div>
        {userInventory.map((item) => (
          <HoverCard
            key={item.id}
            itemName={item.itemName}
            description={item.description}
            quantity={item.quantity}
            onClick={() => openEditModal(item)}
          ></HoverCard>
        ))}
      </div>

      {itemData && (
        <ViewItemModal
          item={itemData}
          onClose={closeEditModal}
          onRefresh={fetchInventory}
        ></ViewItemModal>
      )}
    </>
  );
}

export default Inventory;
