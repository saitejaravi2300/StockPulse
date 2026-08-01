import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./portfolio.css";

export default function Portfolio() {
  const user = JSON.parse(localStorage.getItem("user")) || { id: 1 };

  const [stocks, setStocks] = useState([]);
  const [stockName, setStockName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const API = "http://13.233.88.91:3000/api/portfolio";

  const loadPortfolio = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/${user.id}`);
      setStocks(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [user.id]);

  useEffect(() => {
    Promise.resolve().then(loadPortfolio);
  }, [loadPortfolio]);

  // ADD STOCK
  const addStock = async () => {
    if (!stockName || !qty || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/add`, {
        user_id: user.id,
        stock_name: stockName.toUpperCase(),
        quantity: Number(qty),
        buy_price: Number(price),
      });

      alert("Stock Added Successfully");
      window.dispatchEvent(new Event("portfolioUpdated"));
      setStockName("");
      setQty("");
      setPrice("");

      loadPortfolio();
    } catch (err) {
      console.log(err);
      alert("Failed to add stock");
    } finally {
      setLoading(false);
    }
  };

  const totalInvestment = stocks.reduce(
    (sum, item) =>
      sum + Number(item.quantity) * Number(item.buy_price),
    0
  );

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1>My Portfolio</h1>
        <p>
          Manage and track your stock investments
        </p>
      </div>

      <div className="portfolio-summary-grid">
        <div className="portfolio-card">
          <h3>Total Stocks</h3>
          <h1>{stocks.length}</h1>
        </div>

        <div className="portfolio-card">
          <h3>Total Investment</h3>
          <h1>₹ {totalInvestment.toLocaleString()}</h1>
        </div>

        <div className="portfolio-card portfolio-card-success">
          <h3>Status</h3>
          <h1>Active</h1>
        </div>
      </div>

      <div className="portfolio-panel">
        <h2>Add New Stock</h2>

        <div className="portfolio-form">
          <input
            type="text"
            placeholder="Stock Name"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Quantity"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />

          <input
            type="number"
            placeholder="Buy Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button onClick={addStock}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      <div>
        <h2 className="portfolio-section-title">Holdings</h2>

        {stocks.length === 0 ? (
          <div className="portfolio-card">No stocks added yet.</div>
        ) : (
          <div className="portfolio-holdings-grid">
            {stocks.map((stock) => {
              const invested =
                Number(stock.quantity) *
                Number(stock.buy_price);

              return (
                <div
                  key={stock.id}
                  className="portfolio-holding-card"
                >
                  <h2>{stock.stock_name}</h2>

                  <p>
                    Quantity: <b>{stock.quantity}</b>
                  </p>

                  <p>
                    Buy Price: <b>₹ {stock.buy_price}</b>
                  </p>

                  <p className="portfolio-invested">
                    Invested: ₹ {invested.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
