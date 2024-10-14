import React from "react";
import styles from "./Popup.module.css";
interface Item {
  image: {
    desktop: string;
  };
  category: string;
  name: string;
  price: number;
}

interface PopupProps {
  data: Item[];
  itemState: {
    [key: number]: { isAdded: boolean; count: number };
  };

  startNewOrder: () => void;
}

const Popup: React.FC<PopupProps> = ({
  data,
  itemState,
  startNewOrder,
}) => {
  return (
    <>
      <div className={styles.popup_overlay}>
        <div className={styles.popup}>
          <img
            src="./../assets/images/icon-order-confirmed.svg"
            alt=""
          />
          <h2>Orderd Confirmed</h2>
          <p>We hope You enjoy your food</p>
          <ul className={styles.cart_items}>
            {data.map((item, i) => {
              if (itemState[i]?.count > 0) {
                return (
                  <li key={i}>
                    {data[i].thumbnail}
                    {item.name}
                    <hr />
                  </li>
                );
              }
            })}
          </ul>
          <button
            className={styles.confirm_order_button}
            onClick={startNewOrder}
          >
            Start New Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;
