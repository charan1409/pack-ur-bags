const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult, cookie } = require("express-validator");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
router.use(cookieparser());
const url = require("url");
const multer = require('multer');
const path = require("path");
const fs = require("fs");

const book = require("../schemas/book");
const User = require("../schemas/user");
const fdb = require("../schemas/feedback");
const Admin = require("../schemas/admin");
const Place = require("../schemas/place");
const adminverifier = require("../routes/adminverifier");

// table data of users for admin
router.get("/users", (req, res) => {
  let role = url.parse(req.url, true).query.role;
  User.find({ role: role }, (err, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      console.log(err);
    }
  });
});

router.get("/feedback", adminverifier, (req, res) => {
  let email = req.user.id;
  Admin.findOne({ email: email }).then((user) => {
    fdb.find({}, (err, data) => {
      if (data) {
        res.render("feedback", { user, model: data });
      } else {
        console.log(err);
      }
    });
  });
});

// table data of bookings for admin
router.get("/bookings", adminverifier, (req, res) => {
  let email = req.user.id;
  Admin.findOne({ email: email }).then((user) => {
    book.find({}, (err, data) => {
      if (data) {
        res.render("bookings", { user, model: data });
      } else {
        console.log(err);
      }
    });
  });
});

// to remove users by backend
router.delete("/delete/:id", async (req, res) => {
  let username = req.params.id;
  await User.findOneAndDelete({ username: username }, async (err, doc) => {
    const prof = doc.image
    if(prof !== "default.png") fs.unlink(prof)
    await book.deleteMany({ username: username });
    await fdb.deleteOne({username: doc.username});
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ msg: `user deleted ${doc.username}` });
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/places')
  },
  filename: function (req, file, callback) {
      callback(null, Date.now() + Math.floor(Math.random() * 10) + path.extname(file.originalname));
  }
});

const upload = multer({storage:storage})

router.post("/place/:id",upload.single('photo'), async(req, res) => {
  if (!req.params.id) {
    res.status(201).json({ error: "error occurred" });
  } else {
    let username = req.params.id;
    const newplace = new Place({
      id: req.body.id,
      from: req.body.from,
      to: req.body.to,
      photo: "http://localhost:9000/places/"+req.file.filename,
      price: req.body.price,
      details: req.body.details,
      category: req.body.category,
      busType: req.body.busType,
      days: req.body.days,
      reviews: [],
      availability: true,
    });
    await User.findOne({ username: username }).then((user) => {
      if(user.role === "admin"){
        newplace.save().then(() => {
          res.status(200).json({ success: "place added Successfully" });
        });
      } else{
        res.status(201).json({ error: "error occurred" });
      }
    });
  }
});

module.exports = router;
