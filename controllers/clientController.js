const Client = require("../models/clientModel");
const Firm = require("../models/firmModel");
const Particular = require("../models/particularModel");

const createClientHandler = async (req, res) => {
  try {
    const { name, address, landmark, gst, prop } = req.body;

    if (name && address && landmark && gst && prop !== "") {
      const client = await new Client({ name, address, landmark, gst, prop });

      await client.save();
      res.json({ message: "client Created", client });
    } else {
      res.json({ message: "Fill All client Details " });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();

    if (clients) {
      res.json({
        clients,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const createFirmHandler = async (req, res) => {
  try {
    const { name, address, landmark, gst, prop } = req.body;

    if (name && address && landmark && gst && prop !== "") {
      const firm = await new Firm({ name, address, landmark, gst, prop });

      await firm.save();
      res.json({ message: "Firm Created!", firm });
    } else {
      res.json({ message: "Fill All client Details " });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllFirms = async (req, res) => {
  try {
    const firms = await Firm.find();

    if (firms) {
      res.json({
        firms,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const createInventory = async (req, res) => {
  try {
    const { name, hsn, batch, expiry, tax ,price} = req.body;

    if (name && hsn && batch && expiry && tax && price!== "") {
      const particular = await new Particular({
        name,
        hsn,
        batch,
        expiry,
        tax,
        price
      });

      await particular.save();
      res.json({ message: "New item added", particular });
    } else {
      res.json({ message: "Fill All item Details " });
    }
  } catch (err) {
    console.log(err);
  }
};




const getAllProducts =async (req,res)=>{
  try {
    const particulars = await Particular.find();

    if (particulars) {
      res.json({
        particulars,
      });
    }
  } catch (err) {
    console.log(err);
  }

}
module.exports = {
  createClientHandler,
  getAllClients,
  createFirmHandler,
  getAllFirms,
  createInventory,
  getAllProducts,
};
