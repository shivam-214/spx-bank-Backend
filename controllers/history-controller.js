const History = require("../models/history");

exports.viewHistory = (req, res, next) => {
  History.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};
