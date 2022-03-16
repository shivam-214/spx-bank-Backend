const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  customerId: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerAccount: {
    type: Number,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerBalance: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
