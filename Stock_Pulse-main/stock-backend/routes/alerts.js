const express = require("express");
const router = express.Router();
const { createAlert } = require("../controllers/alertsController");

router.post("/create", createAlert);

module.exports = router;
