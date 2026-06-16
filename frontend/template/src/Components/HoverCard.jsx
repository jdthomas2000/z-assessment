function HoverCard({ itemName, description, quantity }) {
  return (
    <a href="#" className="hover-3d my-12 mx-2 cursor-pointer">
      <div className="card w-96 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
        <div className="card-body">
          <div className="flex justify-between mb-10">
            <div className="font-bold">{itemName}</div>
            <div className="text-6xl opacity-10">📚</div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-xs opacity-20">DESCRIPTION</div>
              <div>
                {description.length > 100
                  ? `${description.substring(0, 99)} ...`
                  : description}
              </div>
            </div>
            <div>
              <div className="text-xs opacity-20 text-right">QUANTITY</div>
              <div className="text-right">{quantity}</div>
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
    </a>
  );
}

export default HoverCard;
