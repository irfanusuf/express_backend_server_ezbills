const mongoose = require("mongoose");

const Particular = mongoose.model("Particular", {
  name: String,
  hsn: String,
  batch: String,
  expiry: String,
  tax: Number,
  price:Number
});




module.exports = Particular