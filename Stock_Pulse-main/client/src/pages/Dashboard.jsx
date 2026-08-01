import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || { id: 1 };

  const [portfolio, setPortfolio] = useState([]);
  const [stocks, setStocks] = useState([
    { name: "NIFTY 50", price: 22450, change: 0.62 },
    { name: "SENSEX", price: 73980, change: -0.21 },
    { name: "RELIANCE", price: 2890, change: 1.42 },
    { name: "TCS", price: 4120, change: -0.55 },
    { name: "INFY", price: 1540, change: 0.88 },
    { name: "HDFC BANK", price: 1688, change: 0.32 },
  ]);

  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  const loadPortfolio = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://13.233.88.91:3000/api/portfolio/${user.id}`
      );
      setPortfolio(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [user.id]);

  const refreshStocks = useCallback(() => {
    setStocks((currentStocks) =>
      currentStocks.map((stock) => ({
        ...stock,
        price: (
          parseFloat(stock.price) +
          (Math.random() * 10 - 5)
        ).toFixed(2),
        change: (Math.random() * 4 - 2).toFixed(2),
      }))
    );
  }, []);

  useEffect(() => {
    Promise.resolve().then(loadPortfolio);

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      refreshStocks();
    }, 5000);

    window.addEventListener("portfolioUpdated", loadPortfolio);

    return () => {
      clearInterval(timer);
      window.removeEventListener("portfolioUpdated", loadPortfolio);
    };
  }, [loadPortfolio, refreshStocks]);

  const portfolioInvestment = portfolio.reduce(
    (sum, item) =>
      sum + Number(item.quantity) * Number(item.buy_price),
    0
  );

  const totalProfit = portfolioInvestment * 0.08;
  const todayGain = portfolioInvestment * 0.012;

  const riskScore =
    portfolio.length <= 2
      ? "High"
      : portfolio.length <= 5
      ? "Medium"
      : "Low";

  const topGainer = [...stocks].sort(
    (a, b) => b.change - a.change
  )[0];

  const topLoser = [...stocks].sort(
    (a, b) => a.change - b.change
  )[0];

  return (
    <div className="main-dashboard">

      <div className="top-header">
        <div>
          <h2>Welcome Back 👋</h2>
          <p>Indian Stock Market Live Dashboard</p>
        </div>
        <div className="live-clock">⏰ {time}</div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Portfolio Value</h3>
          <h1>₹ {portfolioInvestment.toLocaleString()}</h1>
        </div>

        <div className="summary-card green">
          <h3>Total Profit</h3>
          <h1>+ ₹ {totalProfit.toFixed(0)}</h1>
        </div>

        <div className="summary-card">
          <h3>Today's Gain</h3>
          <h1>+ ₹ {todayGain.toFixed(0)}</h1>
        </div>

        <div className="summary-card red">
          <h3>Risk Score</h3>
          <h1>{riskScore}</h1>
        </div>
      </div>

      <h2 className="section-title">📈 Live Market</h2>

      <div className="stock-grid">
        {stocks.map((stock, index) => (
          <div className="stock-card" key={index}>
            <h3>{stock.name}</h3>
            <h2>₹ {stock.price}</h2>
            <p
              className={
                parseFloat(stock.change) >= 0
                  ? "green-text"
                  : "red-text"
              }
            >
              {parseFloat(stock.change) >= 0 ? "+" : ""}
              {stock.change}%
            </p>
          </div>
        ))}
      </div>

      <h2 className="section-title">My Holdings</h2>

      <div className="stock-grid">
        {portfolio.length === 0 ? (
          <div className="stock-card stock-card-empty">
            No stocks added yet.
          </div>
        ) : (
          portfolio.map((item) => {
            const invested =
              Number(item.quantity) *
              Number(item.buy_price);

            return (
              <div className="stock-card" key={item.id}>
                <h3>{item.stock_name}</h3>
                <h2>{item.quantity} Qty</h2>
                <p>Buy Price: ₹ {Number(item.buy_price).toLocaleString()}</p>
                <p className="green-text">
                  Invested: ₹ {invested.toLocaleString()}
                </p>
              </div>
            );
          })
        )}
      </div>

      <div className="bottom-grid">
        <div className="widget">
          <h3>🔥 Top Gainer</h3>
          <p>{topGainer.name} +{topGainer.change}%</p>
        </div>

        <div className="widget">
          <h3>📉 Top Loser</h3>
          <p>{topLoser.name} {topLoser.change}%</p>
        </div>

        <div className="widget">
          <h3>Portfolio Investment</h3>
          <p>₹ {portfolioInvestment.toLocaleString()}</p>
        </div>

        <div className="widget">
          <h3>Holdings Count</h3>
          <p>{portfolio.length} Stocks Added</p>
        </div>

        <div className="widget">
          <h3>📰 Market News</h3>
          <p>Nifty remains strong amid positive momentum.</p>
        </div>
      </div>

    </div>
  );
}
