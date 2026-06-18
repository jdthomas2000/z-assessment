import { useState, useEffect, useRef } from "react";

function OnlyViewItemModal({ onClose, item }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const dialog = useRef(null);

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
          <h3 className="font-bold text-lg">View Item!</h3>
          <div className="my-6 mx-2">
            <div className="card w-96 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
              <div className="card-body">
                <div className="flex flex-col gap-1 mb-4">
                  <div className="text-xs opacity-20">Item Name</div>
                  <div className="flex justify-between w-full items-center">
                    <div>{itemName}</div>
                    <div className="text-6xl opacity-10">📚</div>
                  </div>
                </div>

                <div className="w-full mb-4">
                  <div>
                    <div className="text-xs opacity-20 mb-2">DESCRIPTION</div>
                    <div>{description}</div>
                  </div>

                  <div className="flex justify-start w-full">
                    <div className="w-1/3">
                      <div className="text-xs opacity-20 text-left mb-2">
                        QUANTITY
                      </div>
                      <div>{quantity}</div>
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
              <button className="btn btn-neutral" onClick={onClose}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default OnlyViewItemModal;
