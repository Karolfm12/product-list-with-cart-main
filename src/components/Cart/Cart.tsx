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
                <div>{item.name}</div>
                {itemState[i]?.count}x&nbsp;&nbsp;
                <hr />
              </li>
            );
          }
        })}
      </ul>
      <div>Order total: {totalPrice}</div>
    </>
  );
};

export default Cart;
