const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const cookieparser = require("cookie-parser");
router.use(cookieparser());

const OTP = require("../schemas/otp");
const User = require("../schemas/user");
const Feedback = require("../schemas/feedback");
const TokenVerifier = require("../routes/TokenVerifier");

router.get("/profileDetails/:id",TokenVerifier, async (req, res) => {
  const username = req.params.id;
  const verifiedEmail = req.user.id;
  const user = await User.findOne({ username: username }).populate({
    path: "tourReviews",
    populate: { path: "place" },
  }).populate("givenfeedback").exec();
  if(user.email != verifiedEmail){
    res.status(201).json({ error: "Invalid Email" });
  } else{
    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      image: "http://localhost:9000/profileImgs/" + user.image,
      imagegiven: user.imagegiven,
      feedbackgiven: user.feedbackgiven,
      givenfeedback: user.givenfeedback,
      name: user.name,
      phonenumber: user.phonenumber,
      gender: user.gender,
      tourReviews: user.tourReviews,
    };
    res.status(200).json(data);
  }
});

router.post("/edit",TokenVerifier, async (req, res) => {
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

router.post("/changepass",TokenVerifier, async (req, res) => {
  const email = req.body.email;
  const pass = req.body.oldpassword;
  const pass1 = req.body.newpassword;
  const user = await User.findOne({ email: email });
  const validPass = await bcrypt.compare(pass, user.password);
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(pass1, salt);
  const newvals = { password: hashPassword };
  const givenotp = req.body.otp + "";
  OTP.findOne({ email: email }).then(async (otp) => {
    if (!otp) {
      res.status(201).json({ msg: "Invalid OTP" });
    } else if (
      otp.OTP === givenotp &&
      otp.OTPTime + 5 * 60 * 1000 > Date.now()
    ) {
      OTP.deleteOne({ _id: otp._id }, async (err) => {
        if (err) {
          res.status(500).json({ msg: "Error deleting OTP" });
        } else {
          if (user && validPass) {
            await User.findOneAndUpdate(
              { email: email },
              newvals,
              async function (err) {
                if (err) throw err;
                res.status(200).json({ msg: "password updated successfully." });
              }
            );
          } else {
            res.status(201).json({ msg: "entered incorrect password." });
          }
        }
      });
    } else {
      res.status(201).json({ msg: "Invalid OTP" });
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profileImgs");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      Date.now() +
        Math.floor(Math.random() * 9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
router.post("/upload",TokenVerifier, upload.single("image"), async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (user) {
    await User.findOneAndUpdate(
      { email: email },
      { image: req.file.filename, imagegiven: true },
      async function (err) {
        if (err) throw err;
        await Feedback.findOneAndUpdate(
          { username: user.username },
          { image: req.file.filename },
          async function (err) {
            if (err) throw err;
          }
        );
        res.status(200).json({ succ: "profile updated successfully." });
      }
    );
  } else {
    res.status(201).json({ error: "user not found." });
  }
});

router.post("/remove",TokenVerifier, async (req, res) => {
  const email = req.body.email;
  const newvals = { image: "default.png", imagegiven: false };
  const user = await User.findOne({ email: email });
  if (user) {
    await User.findOneAndUpdate(
      { email: email },
      newvals,
      async function (err) {
        if (err) throw err;
        fs.unlink("./public/profileImgs/" + user.image, (err) => {
          if (err) throw err;
        });
        Feedback.findOneAndUpdate(
          { username: user.username },
          { image: "default.png" },
          async function (err) {
            if (err) throw err;
          }
        );
        res.status(200).json({ succ: "profile updated successfully" });
      }
    );
  } else {
    res.status(201).json({ error: "user not found." });
  }
});

router.post("/feedback",TokenVerifier, async (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const feedback = req.body.feedback;
  const user = await User.findOne({ username: username });
  if (user) {
    await Feedback.findOneAndUpdate(
      { _id: id },
      { feedback: feedback},
      async function (err) {
        if (err) res.status(401).json({ succ: "Some error occurred." });
        res.status(200).json({ succ: "feedback submitted successfully" });
      }
    );
  } else {
    res.status(201).json({ error: "user not found." });
  }
});

// For deleting feedback
router.delete("/deletefeedback/:id",TokenVerifier, async (req, res) => {
  const id = req.params.id;
  const fd = await Feedback.findOne({ _id: id })
  .populate('userDetails')
  .exec();
  await Feedback.findOneAndDelete({ _id: id }, async function (err) {
    if (err) res.status(401).json({ succ: "Some error occurred." });
    await User.findOneAndUpdate(
      { username: fd.userDetails.username },
      { feedbackgiven: false,$unset: { referencedDocument: '' } },
      async function (err) {
        if (err) res.status(401).json({ succ: "Some error occurred." });
        else res.status(200).json({ succ: "feedback deleted successfully" });
      }
    );
  });
});

module.exports = router;
