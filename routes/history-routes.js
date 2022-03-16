const express = require("express");

const historyControllers = require("../controllers/history-controller");

const router = express.Router();

router.get("/", historyControllers.viewHistory);

module.exports = router;
