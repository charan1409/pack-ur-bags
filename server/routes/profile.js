const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const cookieparser = require("cookie-parser");
router.use(cookieparser());

const User = require("../schemas/user");
const book = require("../schemas/book");

const verifier = require("../routes/verifier");

router.get("/changepass", verifier, (req, res) => {
  const email = req.user.id;
  let change = [];
  User.findOne({ email: email }).then((user) => {
    change.push({ msg: "Change your Password" });
    res.render("editprofile", { user, change });
  });
});

router.get("/upload", verifier, (req, res) => {
  const email = req.user.id;
  let changep = [];
  User.findOne({ email: email }).then((user) => {
    changep.push({ msg: "upload profile photo" });
    res.render("editprofile", { user, changep });
  });
});

router.get("/remove", verifier, (req, res) => {
  const email = req.user.id;
  let removep = [];
  User.findOne({ email: email }).then((user) => {
    removep.push({ msg: "remove profile photo" });
    res.render("editprofile", { user, removep });
  });
});

router.post("/edit", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const gender = req.body.gender;
  const phn = req.body.phonenumber;
  const username = req.body.username;
  const newvals = {
    username: username,
    name: name,
    phonenumber: phn,
    gender: gender,
  };
  const userall = await User.findOne({ username: username });
  if (userall && userall.email != email) {
    res.status(201).json({ error: "username already taken." });
  } else {
    await User.findOneAndUpdate(
      { email: email },
      newvals,
      async function (err) {
        if (err) throw err;
        res.status(200).json({ succ: "profile updated successfully." });
      }
    );
  }
});

router.post("/changepass", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.oldpassword;
  const pass1 = req.body.newpassword;
  const user = await User.findOne({ email: email });
  const validPass = await bcrypt.compare(pass, user.password);
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(pass1, salt);
  const newvals = { password: hashPassword };
  if (user && validPass) {
    await User.findOneAndUpdate(
      { email: email },
      newvals,
      async function (err) {
        if (err) throw err;
        res.status(200).json({ succ: "password updated successfully." });
      }
    );
  } else {
    res.status(201).json({ error: "entered incorrect password." });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profileImgs");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + Math.random() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
router.post("/upload",upload.single("image"), async (req, res) => {
  const email = req.body.email;
  await User.findOneAndUpdate(
    { email: email },
    { image: req.file.filename,imagegiven: true },
    async function (err) {
      if (err) throw err;
      res.status(200).json({ succ: "profile updated successfully." });
    }
  );
});

router.post("/remove", async (req, res) => {
  const email = req.body.email;
  const newvals = { image: process.env.DEFAULT_IMAGE,imagegiven: false };
  const user = await User.findOne({ email: email });
  if (user) {
    await User.findOneAndUpdate(
      { email: email },
      newvals,
      async function (err) {
        if (err) throw err;
        res.status(200).json({succ:"profile updated successfully"})
      }
    );
  }
});

module.exports = router;
