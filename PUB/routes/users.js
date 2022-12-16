const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const { check, validationResult } = require("express-validator");
const User = require("../schemas/user");
const Admin = require("../schemas/admin");

router.use(cookieparser());

//login Page
router.get("/login/:id", async(req, res) => {
    const inname = req.params.id;
    const user = await User.findOne({ username: inname });
    console.log(user);
    res.status(200).json(user);
});

//register Page
router.get("/register", (req, res) => res.render("register"));

//  login handle
router.post("/login", async (req, res) => {
  const inname = req.body.username;
  const inpassword = req.body.password;
  let errors = [];
  const user = await User.findOne({ username: inname });
//   if (!user) {
//     const admin = await Admin.findOne({ username: inname });
//     if (!admin) {
//       errors.push({ msg: "Invalid username or password" });
//       res.render("login", { errors });
//     }
//     if (admin) {
//       const validAdminPass = await bcrypt.compare(inpassword, admin.password);
//       if (validAdminPass) {
//         const id = admin.email;
//         const token = jwt.sign({ id }, process.env.ADMIN_TOKEN, {
//           expiresIn: "1d",
//         });
//         res.cookie("admintoken", token, { httpOnly: true });
//         res.render("adminland", { user: admin });
//       } else {
//         errors.push({ msg: "Invalid username or password" });
//         res.render("login", { errors });
//       }
//     }
//   } else {
    const validPass = await bcrypt.compare(inpassword, user.password);
    if (validPass) {
      const id = user.email;
      const token = jwt.sign({ id }, process.env.ACCESS_TOKEN, {
        expiresIn: "1d",
      });
      res.cookie("usertoken", token, { httpOnly: true });
      res.status(200).json(user);
    } else {
      res.status(201).json({"error":"User doesn't exist."});
    }
//   }
});

//register handle
router.post(
  "/register",
  check("upemail").isEmail().normalizeEmail(),
  async (req, res) => {
    const inname = req.body.username;
    const inemail = req.body.email;
    const inpass1 = req.body.password;
    const role = req.body.role;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(inpass1, salt);
    // const mailerrors = validationResult(req);
    const user = await User.findOne({ username: inname });
    const user1 = await User.findOne({ email: inemail });
    const admin = await Admin.findOne({ username: inname });
    const admin1 = await Admin.findOne({ email: inemail });
    if (admin || user) {
      res.status(201).json({"error":"username already exists"});
    } else if (admin1 || user1) {
      res.status(201).json({"error":"Email already exists"});
    } else {
      const newUser = new User({
        id: req.body.id,
        username: inname,
        email: inemail,
        password: hashPassword,
        role: role,
      });
      try {
        await newUser.save().then(async (user) => {
          const id = user.email;
          const token = jwt.sign({ id }, process.env.ACCESS_TOKEN, {
            expiresIn: "1d",
          });
          res.cookie("usertoken", token, { httpOnly: true });
          res.status(200).json({"success":"Registered Successfully"});
        });
      } catch (err) {
        res.status(404).json("token not created");
      }
    }
  }
);

// Home Page for printing name
router.get("/index/:id", (req, res) => {
  const email = req.params.id;
  User.findOne({ email: email }).then((user) => {
    res.render("index", { user });
  });
});

module.exports = router;
