import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [itemState, setItemState] = useState({});

  const fetchItems = async () => {
    try {
      const res = await fetch("../data.json");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleButton = (i) => {
    setItemState((prevItem) => {
      return {
        ...prevItem,
        [i]: {
          isAdded: true,
          count: 1,
        },
      };
    });
  };

  const onIcrementClick = (i) => {
    setItemState((prevState) => {
      const item = prevState[i];
      return {
        ...prevState,
        [i]: { ...item, count: item.count + 1 },
      };
    });
  };

  const onDecrementClick = (i) => {
    setItemState((currentState) => {
      const item = currentState[i];
      if (item.count > 1) {
        return {
          ...currentState,
          [i]: { ...item, count: item.count - 1 },
        };
      } else {
        return {
          ...currentState,
          [i]: {
            ...item,
            isAdded: false,
            count: 0,
          },
        };
      }
    });
  };

  // const totalAmount=

  return (
    <main>
      <div className="container">
        <div className="container-left">
          <h1>Desserts</h1>
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
                  <p className="item-category">
                    {item.category}
                  </p>
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-right">
          <div className="cart-container">
            <h2>Your Cart{itemState.count}</h2>
            <ul>
              {data.map((item, i) => {
                if (itemState[i]?.count > 0) {
                  return (
                    <li key={i}>
                      {itemState[i]?.count}
                      {item.name}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
