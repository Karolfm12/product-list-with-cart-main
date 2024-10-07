import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import ItemList from "./components/itemList";

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

  const totalAmount = Object.values(itemState).reduce(
    (total, current) => total + current.count,
    0
  );

  const totalPrice = data.reduce((total, current, i) => {
    if (itemState[i]?.count > 0) {
      return total + current.price * itemState[i].count;
    }
    return total;
  }, 0);

  useEffect(() => {
    fetchItems();
    console.log(totalPrice);
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
        const newState = { ...currentState };
        delete newState[i];
        return newState;
      }
    });
  };

  // const totalAmount=

  return (
    <main>
      <div className="container">
        <div className="container-left">
          <h1>Desserts</h1>
          <ItemList
            data={data}
            itemState={itemState}
            handleButton={handleButton}
            onIcrementClick={onIcrementClick}
            onDecrementClick={onDecrementClick}
          ></ItemList>
        </div>
        <div className="container-right">
          <div className="cart-container">
            <Cart
              totalAmount={totalAmount}
              data={data}
              itemState={itemState}
              totalPrice={totalPrice}
            ></Cart>
            {/* <h2>Your Cart ({totalAmount})</h2>
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
            <div>Order total: {totalPrice}</div> */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
