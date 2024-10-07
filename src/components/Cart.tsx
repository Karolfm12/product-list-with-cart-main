import React from "react";

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
      <ul className="cart-items">
        {data.map((item, i) => {
          if (itemState[i]?.count > 0) {
            return (
              <li key={i}>
                {itemState[i]?.count}
                {item.name}
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
