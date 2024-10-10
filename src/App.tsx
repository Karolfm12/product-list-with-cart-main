import React, { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import ItemList from "./components/ItemList/ItemList";

interface Item {
  category: string;
  price: number;
  name: string;
  image: {
    desktop: string;
  };
}

interface itemState {
  [key: number]: { isAdded: boolean; count: number };
}

function App() {
  const [data, setData] = useState<Item[]>([]);
  const [itemState, setItemState] = useState<itemState>({});

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
  }, []);

  const handleButton = (i: number) => {
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

  const onIcrementClick = (i: number) => {
    setItemState((prevState) => {
      const item = prevState[i];
      return {
        ...prevState,
        [i]: { ...item, count: item.count + 1 },
      };
    });
  };

  const onDecrementClick = (i: number) => {
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

  const onDeleteItem = (i: number) => {
    setItemState((currentStates) => {
      const item = currentStates[i];
      console.log(item);
    });
  };

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
              onDeleteItem={onDeleteItem}
            ></Cart>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
