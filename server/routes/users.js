const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const { check, validationResult } = require("express-validator");
const User = require("../schemas/user");
const Admin = require("../schemas/admin");
const FeedBack = require("../schemas/feedback");

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
router.post("/register/:id", async (req, res) => {
  const inname = req.body.username;
  const inemail = req.params.id;
  const inpass1 = req.body.password;
  const role = req.body.role;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(inpass1, salt);
  const user = await User.findOne({ username: inname });
  const user1 = await User.findOne({ email: inemail });
  const admin = await Admin.findOne({ username: inname });
  const admin1 = await Admin.findOne({ email: inemail });
  if (admin || user) {
    res.status(201).json({ msg: "username already exists" });
  } else if (admin1 || user1) {
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
  const otp = Math.floor(100000 + Math.random() * 900000)+"";
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'packurbagsofficial@gmail.com',
      pass: 'onyavecwmwqcpkla'
    }
  });

  const message = {
    from: 'packurbagsofficial@gmail.com',
    to: email,
    subject: 'Your OTP',
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`
  };
  
  // Send the email message
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });

  // code for checking whether user exists or not and setting otp in db
  User.findOne({ email: email }).then((user) => {
    if (user) {
      user.OTP = otp;
      user.OTPTime = Date.now();
      user.save();
      res.status(200).json({ msg: "OTP sent to your mail" });
    } else {
      const newUser = new User({
        email: email,
        OTP: otp,
        OTPTime: Date.now(),
        registered: false,
      });
      newUser.save();
      res.status(200).json({ msg: "OTP sent to your mail" });
    }
  }
  );

});

router.post("/verify", async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.status(200).json({ msg: "Email exists" });
    } else {
      res.status(201).json({ msg: "Email doesn't exist" });
    }
  });
});

module.exports = router;
