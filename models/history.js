const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  SenderName: {
    type: String,
    required: true,
  },
  RecipientName: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("History", HistorySchema);
