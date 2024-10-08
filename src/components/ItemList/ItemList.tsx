import React from "react";
import styles from "./ItemList.module.css";

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
    <ul className={styles.itemslist}>
      {data.map((item, i) => (
        <li className={styles.item} key={i}>
          <img
            src={item.image.desktop}
            alt=""
            className={
              itemState[i]?.isAdded
                ? styles.itemImage_isAdded
                : styles.itemimage
            }
          />
          <button
            className={
              itemState[i]?.isAdded
                ? styles.button_isAdded
                : styles.button_add_to_cart
            }
            onClick={() => handleButton(i)}
          >
            {itemState[i]?.isAdded ? (
              <>
                <img
                  src="../assets/images/icon-decrement-quantity.svg"
                  alt=""
                  className={styles.incDec}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDecrementClick(i);
                  }}
                />
                {itemState[i]?.count}
                <img
                  src="../assets/images/icon-increment-quantity.svg"
                  alt=""
                  className={styles.incDec}
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

          <div className={styles.itemdetails}>
            <p className={styles.itemcategory}>
              {item.category}
            </p>
            <p className={styles.itemname}>{item.name}</p>
            <p className={styles.itemprice}>
              ${item.price.toFixed(2)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
