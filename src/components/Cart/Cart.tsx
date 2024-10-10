import React from "react";
import styles from "./Cart.module.css";
interface Item {
  image: {
    desktop: string;
  };
  category: string;
  name: string;
  price: number;
}

interface CartProps {
  data: Item[];
  itemState: {
    [key: number]: { isAdded: boolean; count: number };
  };
  totalAmount: number;
  totalPrice: number;
  onDeleteItem: (i: number) => void;
}

const Cart: React.FC<CartProps> = ({
  totalAmount,
  data,
  itemState,
  totalPrice,
  onDeleteItem,
}) => {
  return (
    <>
      <h2>Your Cart ({totalAmount})</h2>
      <ul className={styles.cart_items}>
        {data.map((item, i) => {
          if (itemState[i]?.count > 0) {
            return (
              <li
                key={i}
                className={styles.ordered_product}
              >
                <div className={styles.cart_box}>
                  <div className={styles.left}>
                    <div className={styles.item_name}>
                      {item.name}
                    </div>
                    <div
                      className={
                        styles.ordered_product_details
                      }
                    >
                      <span className={styles.item_count}>
                        {itemState[i]?.count}x
                      </span>
                      <span
                        className={styles.product_price}
                      >
                        @ ${data[i].price.toFixed(2)}
                      </span>
                      <span
                        className={
                          styles.total_product_price
                        }
                      >
                        {" "}
                        $
                        {(
                          data[i].price *
                          itemState[i]?.count
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div
                    className={styles.right_buttonDelete}
                  >
                    <img
                      className={styles.delete_item}
                      onClick={(e) => onDeleteItem(i)}
                      src="./../../../assets/images/icon-remove-item.svg"
                      alt=""
                    />
                  </div>
                </div>
                <hr className={styles.horizontal_line}></hr>
              </li>
            );
          }
        })}
      </ul>
      <div className={styles.total_price_box}>
        <span style={{ fontWeight: "500" }}>
          Order total:{" "}
        </span>

        <span className={styles.total_price}>
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </>
  );
};

export default Cart;
