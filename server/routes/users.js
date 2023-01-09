const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const { check, validationResult } = require("express-validator");
const User = require("../schemas/user");
const Admin = require("../schemas/admin");
const FeedBack = require("../schemas/feedback")

router.use(cookieparser());

//login Page
router.get("/loguser/:id", async (req, res) => {
  const inname = req.params.id;
  const user = await User.findOne({ username: inname });
  const fd = await FeedBack.findOne({username: inname});
  const data = {
    user:user,
    fd:fd
  }
  res.status(200).json(data);
});

//  login handle
router.post("/login", async (req, res) => {
  const inname = req.body.username;
  const inpassword = req.body.password;
  const user = await User.findOne({ username: inname });
  if (user && await bcrypt.compare(inpassword, user.password)) {
    const data = {
      username: user.username,
      role: user.role,
      imagegiven: user.imagegiven,
      feedbackgiven: user.feedbackgiven
    }
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
  const admin = await Admin.findOne({ username: inname });
  const admin1 = await Admin.findOne({ email: inemail });
  if (admin || user) {
    res.status(201).json({ error: "username already exists" });
  } else if (admin1 || user1) {
    res.status(201).json({ error: "Email already exists" });
  } else {
    const newUser = new User({
      id: req.body.id,
      username: inname,
      email: inemail,
      password: hashPassword,
      role: role,
      image: process.env.DEFAULT_IMAGE,
      imagegiven: false,
      feedbackgiven: false,
    });
    try {
      await newUser.save().then(async (user) => {
        const data = {
          username: user.username,
          role: user.role,
          imagegiven: user.imagegiven,
          feedbackgiven: user.feedbackgiven
        }
        res.status(200).json({ success: "Registered Successfully",userL: data });
      });
    } catch (err) {
      res.status(404).json("token not created");
    }
  }
});

module.exports = router;
