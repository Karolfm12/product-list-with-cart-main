import React from "react";
import styles from "./Popup.module.css";
interface Item {
  image: {
    desktop: string;
    thumbnail: string;
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
                    <div
                      className={styles.order_details_left}
                    >
                      <img
                        src={data[i].image.thumbnail}
                        alt=""
                      />

                      <div
                        className={
                          styles.order_details_left_box
                        }
                      >
                        <span> {item.name}</span>
                        <div
                          className={
                            styles.order_details_left_box_down
                          }
                        >
                          <span>
                            {" "}
                            {itemState[i].count}x{" "}
                          </span>
                          <span>
                            {" "}
                            @${data[i].price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.order_details_right}
                    >
                      $
                      {(
                        data[i].price * itemState[i].count
                      ).toFixed(2)}
                    </div>
                    <hr></hr>
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
