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
}

const Cart: React.FC<CartProps> = ({
  totalAmount,
  data,
  itemState,
  totalPrice,
}) => {
  return (
    <>
      <h2>Your Cart ({totalAmount})</h2>
      <ul className={styles.cart_items}>
        {data.map((item, i) => {
          if (itemState[i]?.count > 0) {
            return (
              <li key={i}>
                <div className={styles.item_name}>
                  {item.name}
                </div>
                <span className={styles.item_count}>
                  {itemState[i]?.count}x&nbsp;&nbsp;
                </span>
                @ ${data[i].price.toFixed(2)}&nbsp;&nbsp; $
                {(
                  data[i].price * itemState[i]?.count
                ).toFixed(2)}
                <hr />
              </li>
            );
          }
        })}
      </ul>
      <div>Order total: {totalPrice.toFixed(2)}</div>
    </>
  );
};

export default Cart;
