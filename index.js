const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const customerRoutes = require("./routes/cutomer-routes");
const historyRoutes = require("./routes/history-routes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/customers", customerRoutes);
app.use("/api/history", historyRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.send({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${process.env.PORT ? process.env.PORT : 5000}`
      );
    });
  })
  .catch((err) => {
    console.log("DB NOT CONNECTED");
  });
