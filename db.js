const mongoose = require("mongoose");

function connectDB(uri) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = connectDB;
