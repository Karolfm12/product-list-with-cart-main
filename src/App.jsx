import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

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

  return (
    <main>
      <div className="container">
        <div className="container-left">
          <h1>Desserts</h1>
          <ul className="items-list">
            {data.map((item, i) => (
              <li className="item" key={i}>
                <img src={item.image.desktop} alt="" />
                <button className="button-add-to-cart">
                  <img
                    style={{ width: "20px" }}
                    src="../assets/images/icon-add-to-cart.svg"
                    alt=""
                  />
                  Add to Cart
                </button>
                <p className="item-category">{item.category}</p>
                <p className="item-name">{item.name}</p>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
