const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult, cookie } = require("express-validator");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
router.use(cookieparser());
const url = require("url");

const book = require("../schemas/book");
const User = require("../schemas/user");
const fdb = require("../schemas/feedback");
const Admin = require("../schemas/admin");
const Place = require("../schemas/place");
const adminverifier = require("../routes/adminverifier");

// table data of users for admin
router.get("/users", (req, res) => {
  let role = url.parse(req.url, true).query.role;
  //   let email = req.user.id;
  //   Admin.findOne({ email: email }).then((user) => {
  //     User.find({}, (err, data) => {
  //       if (data) {
  //         res.render("users", { user, model: data });
  //       } else {
  //         console.log(err);
  //       }
  //     });
  //   });
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
router.delete("/delete/:id", (req, res) => {
  let username = req.params.id;
  User.findOneAndDelete({ username: username }, (err, doc) => {
    book.deleteMany({ username: username });
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ msg: `user deleted ${username}` });
    }
  });
});

router.post("/place/:id", (req, res) => {
  if (!req.params.id) {
    res.status(201).json({ error: "error occurred" });
  } else {
    let username = req.params.id;
    const newplace = new Place({
      id: req.body.id,
      from: req.body.from,
      to: req.body.to,
      photo: req.body.image,
      price: req.body.price,
      details: req.body.details,
      category: req.body.category,
      busType: req.body.busType,
      days: req.body.days,
      reviews: [],
      availability: true,
    });
    User.findOne({ username: username }, (user) => {
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
