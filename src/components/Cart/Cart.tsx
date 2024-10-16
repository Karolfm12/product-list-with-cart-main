import React from "react";
import styles from "./Cart.module.css";
export interface Item {
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
  confirmOrderButtonClick: () => void;
}

const Cart: React.FC<CartProps> = ({
  totalAmount,
  data,
  itemState,
  totalPrice,
  onDeleteItem,
  confirmOrderButtonClick,
}) => {
  return (
    <>
      <h2>Your Cart ({totalAmount})</h2>
      <ul className={styles.cart_items}>
        {data.map((item, i) => {
          if (itemState[i]?.count > 0) {
            return (
              <li key={i} className={styles.ordered_product}>
                <div className={styles.cart_box}>
                  <div className={styles.left}>
                    <div className={styles.item_name}>{item.name}</div>
                    <div className={styles.ordered_product_details}>
                      <span className={styles.item_count}>
                        {itemState[i]?.count}x
                      </span>
                      <span className={styles.product_price}>
                        @ ${data[i].price.toFixed(2)}
                      </span>
                      <span className={styles.total_product_price}>
                        {" "}
                        ${(data[i].price * itemState[i]?.count).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.right_buttonDelete}>
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

      {totalPrice ? (
        <>
          <div className={styles.total_price_box}>
            <span style={{ fontWeight: "500" }}>Order total:</span>

            <span className={styles.total_price}>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.neutral_delivery}>
            <img
              src="./../../../assets/images/icon-carbon-neutral.svg"
              alt=""
            />
            <p>This is a carbon-neutral delivery</p>
          </div>
          <button
            className={styles.confirm_order_button}
            onClick={confirmOrderButtonClick}
          >
            Confirm Order
          </button>
        </>
      ) : (
        <div className={styles.empty_cart}>
          <img
            src="./../../../assets/images/illustration-empty-cart.svg"
            alt=""
          />
          <p>Your added items will appear here</p>
        </div>
      )}
    </>
  );
};

export default Cart;
