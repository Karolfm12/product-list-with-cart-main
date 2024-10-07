import React from "react";

interface Item {
  image: {
    desktop: string;
  };
  category: string;
  name: string;
  price: number;
}

interface ItemListProps {
  data: Item[];
  itemState: {
    [key: number]: { isAdded: boolean; count: number };
  };
  handleButton: (i: number) => void;
  onIcrementClick: (i: number) => void;
  onDecrementClick: (i: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  data,
  itemState,
  handleButton,
  onIcrementClick,
  onDecrementClick,
}) => {
  return (
    <ul className="items-list">
      {data.map((item, i) => (
        <li className="item" key={i}>
          <img
            src={item.image.desktop}
            alt=""
            className="item-image"
          />
          <button
            className={
              itemState[i]?.isAdded
                ? "button-isAdded"
                : "button-add-to-cart"
            }
            onClick={() => handleButton(i)}
          >
            {itemState[i]?.isAdded ? (
              <>
                <img
                  src="../assets/images/icon-decrement-quantity.svg"
                  alt=""
                  className="incDec"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDecrementClick(i);
                  }}
                />
                {itemState[i]?.count}
                <img
                  src="../assets/images/icon-increment-quantity.svg"
                  alt=""
                  className="incDec"
                  onClick={(e) => {
                    e.stopPropagation();
                    onIcrementClick(i);
                  }}
                />
              </>
            ) : (
              <>
                <img
                  src="../assets/images/icon-add-to-cart.svg"
                  alt=""
                />
                Add to Cart
              </>
            )}
          </button>

          <div className="item-details">
            <p className="item-category">{item.category}</p>
            <p className="item-name">{item.name}</p>
            <p className="item-price">
              ${item.price.toFixed(2)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
