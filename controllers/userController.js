const bcrypt = require("bcrypt");
const User = require("../models/usermodel");
const Jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail", // name smtp service provider     // esp
  secure: "false", // ssl/ tls certificate required if true
  auth: {
    user: "irfanusuf33@gmail.com",
    pass: "tigm xldm sazj cxf",
  },
});

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

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.query;

    const delUser = await User.findByIdAndDelete(_id);

    if (delUser) {
      res.json({ message: "User account deleted!" });
    } else {
      res.json({ message: "User Not Found " });
    }
  } catch (err) {
    console.log(err);
  }
};

const forgotPassHandler = async (req, res) => {
  const { email } = req.body;

  const IsUser = await User.findOne({ email });

  if (IsUser) {
    const options = {
      from: "irfanusuf33@gmail.com",
      to: `${email}`,
      subject: "Changing Password Of express App",
      text: "link",
    };

    const sendMail = await transport.sendMail(options);

    if (sendMail) {
      res.json({
        message: "Change Password link Sent Succesfully on your Email!",
      });
    } else {
      res.json({ message: "Server Error" });
    }
  }
  else {

    res.json({ message: "User not Found " });
  }
};

module.exports = {
  registerHandler,
  loginHandler,
  deleteUser,
  forgotPassHandler,
};
