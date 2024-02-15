const mongoose = require("mongoose");

const Firm = mongoose.model("Firm", {
  name: String,
  address: String,
  landmark: String,
  gst: String,
  prop: String,
});




module.exports = Firm