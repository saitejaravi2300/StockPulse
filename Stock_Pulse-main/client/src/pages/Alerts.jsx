import { useState } from "react";
import "./alerts.css";

export default function Alerts() {
  const [email, setEmail] = useState("");
  const [stock, setStock] = useState("");
  const [condition, setCondition] = useState("above");
  const [price, setPrice] = useState("");

  const createAlert = async () => {
    try {
      const res = await fetch("http://13.233.88.91:3000/api/alerts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          stock,
          condition_type: condition,
          target_price: price
        })
      });

      const data = await res.json();

      alert(data.message);

      setEmail("");
      setStock("");
      setPrice("");

    } catch (err) {
      alert("Failed to create alert");
      console.log(err);
    }
  };

  return (
    <div className="alerts-page">

      <h2>Create Stock Alert</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Stock Name (RELIANCE)"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <select
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      >
        <option value="above">Above</option>
        <option value="below">Below</option>
      </select>

      <input
        placeholder="Target Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={createAlert}>
        Create Alert
      </button>

    </div>
  );
}