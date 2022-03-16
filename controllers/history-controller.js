const History = require("../models/history");

const viewHistory = (req, res, next) => {
  History.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

exports.viewHistory = viewHistory;
