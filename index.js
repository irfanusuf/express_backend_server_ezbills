const express = require("express"); // importing a libarary
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const {
  registerHandler,
  loginHandler,
  deleteUser,
  forgotPassHandler,
} = require("./controllers/userController");
const {
  createClientHandler,
  getAllClients,
  createFirmHandler,
  getAllFirms,
  createInventory,
  getAllProducts
} = require("./controllers/clientController");

const port = 4000;
const url = process.env.URI;

const server = express();

server.use(bodyParser.json());
server.use(cors());

if (mongoose.connect(url)) {
  console.log(`Database connected on ${url}`);
} else {
  console.log("Data base error ");
}

// post routes

server.post("/user/register", registerHandler);
server.post("/user/login", loginHandler);
server.post("/user/delete/me", deleteUser);
server.post("/user/forgotPass", forgotPassHandler);



server.post("/admin/createClient", createClientHandler);
server.post("/admin/createFirm", createFirmHandler);
server.get("/admin/getAllClients", getAllClients);
server.get("/admin/getAllFirms", getAllFirms);
server.get("/admin/getAllProducts", getAllProducts);
server.post("/admin/createParticular", createInventory);

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
