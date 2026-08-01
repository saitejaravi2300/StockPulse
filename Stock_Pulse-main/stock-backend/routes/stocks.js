const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/stocks", async (req, res) => {
  try {
    const apiKey = "*********************";

    const url =
      `https://api.twelvedata.com/price?symbol=RELIANCE:NSE&apikey=${apiKey}`;

    const response = await axios.get(url);

    res.json(response.data);

  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: error.message
    });
  }
});

module.exports = router;
