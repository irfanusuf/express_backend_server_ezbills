const bcrypt = require("bcrypt");
const User = require("../models/usermodel");
const Jwt = require("jsonwebtoken");

const registerHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const ExistingUser = await User.findOne({ email });

    if (!ExistingUser) {
      if ((username !== "" && email !== "", password !== "")) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.json({ message: "Registration Succesful!" });
      } else {
        res.json({ message: "All Credentials Required !" });
      }
    } else {
      res.json({ message: "User Already Exists!" });
    }
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email });

    if (email !== "" && password !== "") {
      if (isUser) {
        const passVerify = await bcrypt.compare(password, isUser.password);

        if (passVerify) {
          const token = await Jwt.sign({ _id: isUser._id }, "oursecretKey");

          res.json({ message: "Logged In succesfully!", token });
        } else {
          res.json({ message: "PassWord Incorrect" });
        }
      } else {
        res.json({ message: "user not Found " });
      }
    } else {
      res.json({ message: "All credentailas required " });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerHandler, loginHandler };
