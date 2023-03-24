const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const cookieparser = require("cookie-parser");
const User = require("../schemas/user");
const FeedBack = require("../schemas/feedback");
const OTP = require("../schemas/otp");

router.use(cookieparser());

//login Page
router.get("/loguser/:id", async (req, res) => {
  const inname = req.params.id;
  const user = await User.findOne({ username: inname });
  const temp = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    image: "http://localhost:9000/profileImgs/" + user.image,
    imagegiven: user.imagegiven,
    gender: user.gender,
    name: user.name,
    phonenumber: user.phonenumber,
    feedbackgiven: user.feedbackgiven,
  };
  const fd = await FeedBack.findOne({ username: inname });
  const data = {
    user: temp,
    fd: fd,
  };
  res.status(200).json(data);
});

//  login handle
router.post("/login", async (req, res) => {
  const inname = req.body.username;
  const inpassword = req.body.password;
  const user = await User.findOne({ username: inname });
  if (user && (await bcrypt.compare(inpassword, user.password))) {
    const data = {
      username: user.username,
      role: user.role,
    };
    res.status(200).json(data);
  } else {
    res.status(201).json({ error: "User doesn't exist." });
  }
});

//register handle
router.post("/register", async (req, res) => {
  const inname = req.body.username;
  const inemail = req.body.email;
  const inpass1 = req.body.password;
  const role = req.body.role;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(inpass1, salt);
  const user = await User.findOne({ username: inname });
  const user1 = await User.findOne({ email: inemail });
  if (user) {
    res.status(201).json({ msg: "username already exists" });
  } else if (user1) {
    res.status(201).json({ msg: "Email already exists" });
  } else {
    const newUser = new User({
      id: req.body.id,
      username: inname,
      email: inemail,
      password: hashPassword,
      role: role,
      image: "default.png",
      imagegiven: false,
      feedbackgiven: false,
      registered: true,
    });
    try {
      await newUser.save().then(async (user) => {
        const data = {
          username: user.username,
          role: user.role,
        };
        res.status(200).json({ msg: "Registered Successfully", user: data });
      });
    } catch (err) {
      res.status(404).json("token not created");
    }
  }
});

router.post("/generateOTP", async (req, res) => {
  const email = req.body.email;
  const keyword = req.body.keyword;
  const otp = Math.floor(100000 + Math.random() * 900000) + "";
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "officialpackurbags@gmail.com",
      pass: "",
    },
  });

  const message = {
    from: "officialpackurbags@gmail.com",
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });

  const newOTP = new OTP({
    email: email,
    OTP: otp,
    OTPTime: Date.now(),
    keyword: keyword,
  });
  OTP.find({ email: email }).then((otp) => {
    if (otp.length > 0) {
      OTP.deleteMany({ email: email }, (err) => {
        if (err) {
          res.status(500).json({ msg: "Error deleting OTP" });
        }
      });
    }
  });
  User.find({ email: email }).then((user) => {
    if (user.length > 0) {
      res.status(500).json({ msg: "Email already exists." });
    } else {
      newOTP.save().then((otp) => {
        res.status(200).json({ msg: "OTP sent to your mail" });
      });
    }
  });
});

router.post("/verify", async (req, res) => {
  const email = req.body.email;
  const givenotp = req.body.otp + "";
  OTP.findOne({ email: email }).then((otp) => {
    if (!otp) {
      res.status(201).json({ msg: "Invalid OTP" });
    } else if (
      otp.OTP === givenotp &&
      otp.OTPTime + 5 * 60 * 1000 > Date.now()
    ) {
      OTP.deleteOne({ _id: otp._id }, (err) => {
        if (err) {
          res.status(500).json({ msg: "Error deleting OTP" });
        } else {
          res.status(200).json({ keyword: otp.keyword });
        }
      });
    } else {
      res.status(201).json({ msg: "Invalid OTP" });
    }
  });
});

router.post("/forgotpassword", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  User.findOneAndUpdate({ email: email }, { password: hashPassword }).then(
    (user) => {
      if (!user) {
        res.status(201).json({ msg: "Invalid Email" });
      } else {
        const data = {
          username: user.username,
          role: user.role,
        };
        res.status(200).json(data);
      }
    }
  );
});

module.exports = router;
