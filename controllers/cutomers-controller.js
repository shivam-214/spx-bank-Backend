const Customer = require("../models/customer");
const History = require("../models/history");

exports.getAllCustomers = (req, res, next) => {
  Customer.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

exports.getCustomerByName = (req, res, next) => {
  const { name } = req.params;
  Customer.findOne({ customerName: name }, (err, result) => {
    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
};

exports.moneyTransfer = (req, res, next) => {
  let sender = req.body.sender;
  let recipient = req.body.recipient;
  let amount = req.body.amount;

  // Time
  const today = new Date();
  const time =
    today.getHours() +
    ":" +
    today.getMinutes() +
    " | " +
    today.getDate() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear();

  Customer.findOne({ customerName: sender }, (e, r) => {
    if (e) {
      res.send(e);
    } else {
      let newAmount = r.customerBalance - amount;
      if (newAmount < 0) {
        const history = new History({
          SenderName: sender,
          RecipientName: recipient,
          Amount: amount,
          Time: time,
          Status: "Failed",
        });

        history.save();
        res.send("Insufficient Balance!");
      } else {
        Customer.updateOne(
          { customerName: sender },
          {
            $set: { customerBalance: newAmount },
            $currentDate: { lastModified: true },
          },
          (error, result) => {
            if (error) {
              console.log(error);
            } else {
              console.log(result);
            }
          }
        );
        Customer.findOne({ customerName: recipient }, (e, r) => {
          if (e) {
            res.send(e);
          } else {
            let newAmount = r.customerBalance - -amount;
            Customer.updateOne(
              { customerName: recipient },
              {
                $set: { customerBalance: newAmount },
                $currentDate: { lastModified: true },
              },
              (error, result) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(result);
                }
              }
            );
          }
        });
        const history = new History({
          SenderName: sender,
          RecipientName: recipient,
          Amount: amount,
          Time: time,
          Status: "OK",
        });

        history.save();
        res.send("Transaction Completed at " + time);
      }
    }
  });
};

