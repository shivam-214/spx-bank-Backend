const express = require("express");

const customerControllers = require("../controllers/cutomers-controller");

const router = express.Router();

router.get("/", customerControllers.getAllCustomers);
router.get("/:name", customerControllers.getCustomerByName);
router.post("/transfer-money", customerControllers.moneyTransfer);

module.exports = router;
