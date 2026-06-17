import { useState, useEffect, useRef } from "react";

function ViewItemModal({ onClose, onRefresh, item }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  function handleItemName(e) {
    setItemName(e.target.value);
  }
  function handleDescription(e) {
    setDescription(e.target.value);
  }
  function handleQuantity(e) {
    setQuantity(e.target.value);
  }

  const token = localStorage.getItem("token");
  const dialog = useRef(null);

  async function handleEdit(e) {
    e.preventDefault();
    try {
      const itemData = {
        itemName: itemName,
        description: description,
        quantity: quantity,
      };
      const response = await fetch(
        `http://localhost:8080/inventory/item/${item.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(itemData),
        },
      );
      const data = await response.json();

      if (response.status === 200) {
        console.log("updated", data);
        onRefresh();
        onClose();
        setItemName("");
        setDescription("");
        setQuantity("");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/inventory/item/${item.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();

      if (response.status === 200) {
        console.log("deleted", data);
        onRefresh();
        onClose();
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (item) {
      setItemName(item.itemName || "");
      setDescription(item.description || "");
      setQuantity(item.quantity || "");
    }
  }, [item]);

  useEffect(() => {
    if (dialog.current) {
      dialog.current.showModal();
    }
  }, []);
  return (
    <>
      <dialog
        id="my_modal_1"
        className="modal"
        ref={dialog}
        onCancel={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">View/Edit/Delete Item!</h3>
          <div className="my-6 mx-2">
            <div className="card w-96 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
              <div className="card-body">
                <div className="flex flex-col gap-1 mb-4">
                  <div className="text-xs opacity-20">Item Name</div>
                  <div className="flex justify-between w-full items-center">
                    <input
                      type="text"
                      placeholder={itemName}
                      className="input input-neutral text-black bg-white w-full max-w-xs"
                      value={itemName}
                      onChange={handleItemName}
                    />
                    <div className="text-6xl opacity-10">📚</div>
                  </div>
                </div>

                <div className="w-full mb-4">
                  <div>
                    <div className="text-xs opacity-20 mb-2">DESCRIPTION</div>
                    <textarea
                      type="text"
                      placeholder={description}
                      className="textarea textarea-bordered w-full text-black bg-white min-h-[100px] resize-y mb-4"
                      value={description}
                      onChange={handleDescription}
                    />
                  </div>

                  <div className="flex justify-start w-full">
                    <div className="w-1/3">
                      <div className="text-xs opacity-20 text-left mb-2">
                        QUANTITY
                      </div>
                      <input
                        type="number"
                        placeholder={quantity}
                        className="input input-neutral text-black bg-white w-full max-w-xs"
                        value={quantity}
                        onChange={handleQuantity}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={handleEdit}>
                Submit Edit
              </button>
              <button className="btn" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn" onClick={onClose}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ViewItemModal;
