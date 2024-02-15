const mongoose = require("mongoose");

const Client = mongoose.model("Client", {
  name: String,
  address: String,
  landmark: String,
  gst: String,
  prop: String,
});




module.exports = Client