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
  totalPrice: number;
  startNewOrder: () => void;
}

const Popup: React.FC<PopupProps> = ({
  data,
  itemState,
  startNewOrder,
  totalPrice,
}) => {
  return (
    <>
      <div className={styles.popup_overlay}>
        <div className={styles.popup}>
          <img src="./../assets/images/icon-order-confirmed.svg" alt="" />
          <h2>Orderd Confirmed</h2>
          <p>We hope You enjoy your food</p>
          <div className={styles.items_box}>
            <ul className={styles.cart_items}>
              {data.map((item, i) => {
                if (itemState[i]?.count > 0) {
                  return (
                    <>
                      <li key={i}>
                        <div className={styles.order_details}>
                          <div className={styles.order_details_left}>
                            <img src={data[i].image.thumbnail} alt="" />

                            <div className={styles.order_details_left_box}>
                              <span className={styles.item_name}>
                                {item.name}
                              </span>
                              <div
                                className={styles.order_details_left_box_down}
                              >
                                <span className={styles.item_count}>
                                  {" "}
                                  {itemState[i].count}x{" "}
                                </span>
                                <span className={styles.product_price}>
                                  {" "}
                                  @${data[i].price.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className={styles.order_details_right}>
                            <span
                              style={{ fontWeight: "500", fontSize: "1.2rem" }}
                            >
                              ${(data[i].price * itemState[i].count).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </li>
                      <hr></hr>
                    </>
                  );
                }
              })}
            </ul>
            <div className={styles.total_price_box}>
              <span style={{ fontWeight: "500" }}>Order Total:</span>
              <span className={styles.total_price}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
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
