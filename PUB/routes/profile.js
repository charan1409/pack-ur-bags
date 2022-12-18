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

router.get("/profile", verifier, (req, res) => {
  const email = req.user.id;
  User.findOne({ email: email }).then(async (user) => {
    book.find({ email: email }).then((bookings) => {
      res.render("profile", { user, model: bookings });
    });
  });
});

router.get("/edit", verifier, (req, res) => {
  const email = req.user.id;
  let edit = [];
  User.findOne({ email: email }).then((user) => {
    edit.push({ msg: "Edit Your Profile" });
    res.render("editprofile", { user, edit });
  });
});

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
  if (userall  && userall.email != email) {
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
  }else{
    res.status(201).json({ error: "entered incorrect password." });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/upload", verifier, upload.single("photo"), async (req, res) => {
  const email = req.user.id;
  const pass = req.body.pass;
  let changep = [];
  let proferr = [];
  const user = await User.findOne({ email: email });
  const validPass = await bcrypt.compare(pass, user.password);
  if (user) {
    if (req.file === undefined) {
      console.log("pic not uploaded");
      changep.push({ msg: "upload your profile photo" });
      proferr.push({ msg: "please fill in all fields" });
      res.render("editprofile", { user, changep, proferr });
    } else if (!pass) {
      let filepath = path.join("public\\uploads\\" + req.file.filename);
      fs.unlink(filepath, (err) => {
        if (err) throw err;
        console.log("profile photo deleted");
      });
      changep.push({ msg: "upload your profile photo" });
      proferr.push({ msg: "please fill in all fields" });
      res.render("editprofile", { user, changep, proferr });
    } else if (validPass) {
      await User.findOneAndUpdate(
        { email: email },
        { image: req.file.filename },
        async function (err, result) {
          if (err) throw err;
          changep.push({ msg2: "profile photo updated succesfully" });
          await User.findOne({ email: email }).then((user) => {
            res.render("profile", { user, changep });
          });
        }
      );
    } else {
      changep.push({ msg: "change your password" });
      proferr.push({ msg: "incorrect password" });
      let filepath = path.join("public\\uploads\\" + req.file.filename);
      fs.unlink(filepath, (err) => {
        if (err) throw err;
        console.log("profile photo not updated");
      });
      res.render("editprofile", { user, changep, proferr });
    }
  }
});

router.post("/remove", verifier, upload.single("photo"), async (req, res) => {
  const email = req.user.id;
  const pass = req.body.pass;
  let removep = [];
  let remerr = [];
  const newvals = { image: null };
  const user = await User.findOne({ email: email });
  const validPass = await bcrypt.compare(pass, user.password);
  if (user) {
    let pic = user.image;
    if (validPass) {
      await User.findOneAndUpdate(
        { email: email },
        newvals,
        async function (err, result) {
          if (err) throw err;
          removep.push({ msg2: "profile photo removed succesfully" });
          await User.findOne({ email: email }).then((user) => {
            if (pic != null) {
              let filepath = path.join("public\\uploads\\" + pic);
              fs.unlink(filepath, (err) => {
                if (err) throw err;
                console.log("profile photo deleted");
              });
            }
            if (!pass) {
              removep.push({ msg: "remove your profile photo" });
              remerr.push({ msg: "please fill in all fields" });
              res.render("editprofile", { user, removep, remerr });
            } else {
              res.render("profile", { user, removep });
            }
          });
        }
      );
    } else {
      removep.push({ msg: "change your password" });
      remerr.push({ msg: "incorrect password" });
      res.render("editprofile", { user, removep, remerr });
    }
  }
});

module.exports = router;
