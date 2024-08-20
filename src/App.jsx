import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [count, setCount] = useState(0);

  const fetchItems = async () => {
    try {
      const res = await fetch("../data.json");
      const data = await res.json();

      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleButton = (e) => {
    setIsAdded(true);

    const styles = e.currentTarget.style;
    styles.backgroundColor = "hsl(14, 86%, 42%)";
    styles.color = "white";
    styles.display = "flex";
    styles.justifyContent = "space-between";
    // setIsAdded(true);
    //   const styles = e.currentTarget.style;
    //   styles.width = "70%";
    //   styles.backgroundColor = "hsl(14, 86%, 42%)";
    //   styles.color = "white";
    //   styles.border = "1px solid hsl(14, 86%, 42%)";
    //   e.target.innerHTML = `<img src="../assets/images/icon-decrement-quantity.svg" alt="" class="incDec" onClick=${() =>
    //     setCount(
    //       count - 1
    //     )}>Added to Cart<img src="../assets/images/icon-increment-quantity.svg" alt="" class="incDec" onClick=${() =>
    //     setCount(count + 1)}>`;
  };

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
                  className="button-add-to-cart"
                  onClick={handleButton}
                >
                  {isAdded ? (
                    <>
                      <img
                        src="../assets/images/icon-decrement-quantity.svg"
                        alt=""
                        className="incDec"
                        onClick={() =>
                          setCount(count - 1)
                        }
                      />
                      {count}
                      <img
                        src="../assets/images/icon-increment-quantity.svg"
                        alt=""
                        className="incDec"
                        onClick={() =>
                          setCount(count + 1)
                        }
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
                  <p className="item-name">
                    {item.name}
                  </p>
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
            <h2>Your Cart</h2>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
