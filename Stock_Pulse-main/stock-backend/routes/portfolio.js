const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* GET PORTFOLIO */
router.get("/:id", (req, res) => {
  const userId = req.params.id;

  db.query(
    "SELECT * FROM portfolio WHERE user_id=? ORDER BY id DESC",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

/* ADD STOCK */
router.post("/add", (req, res) => {
  console.log("BODY:", req.body);

  const { user_id, stock_name, quantity, buy_price } = req.body;

  db.query(
    "INSERT INTO portfolio (user_id, stock_name, quantity, buy_price) VALUES (?, ?, ?, ?)",
    [user_id, stock_name, quantity, buy_price],
    (err, result) => {
      if (err) {
        console.log("SQL ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Stock Added"
      });
    }
  );
});

module.exports = router;
