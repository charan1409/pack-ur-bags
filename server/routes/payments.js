const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Pay = require("../schemas/payment");
const User = require("../schemas/user");
const Place = require("../schemas/place");
const Book = require("../schemas/book");


router.get("/pay/:id", (req, res) => {
  let bookid = req.params.id;
  Book.findOne({id: bookid}).populate('placedetails').exec((err,bookings)=>{
    if(err) res.status(201).json({error: "Some error incurred."});
    else{
      console.log(bookings);
      res.status(200).json(bookings);
    }
  })
});

router.get("/mybookings/:id", async (req, res) => {
  let username = req.params.id;
  Book.find({username: username}).populate('placedetails').exec((err,bookings)=>{
    console.log(bookings);
    if(err) res.status(201).json({error: "Some error incurred."});
    else{
      res.status(200).json(bookings);
    }
  })
});

router.post("/pay/:id", (req, res) => {
  const bookid = req.params.id;
  let username = req.body.username;
  const num = req.body.number;
  const hold = req.body.holder;
  const mon = req.body.expmon;
  const year = req.body.expyear;
  const cvv = req.body.cvv;

  const newpe = new Pay({
    number: num,
    name: hold,
    expmonth: mon,
    expyear: year,
    cvv: cvv,
    name: username,
    bookid: bookid,
    timestamp: new Date(),
  });
  //save user
  newpe.save().then((pay) => {
    Book.findOneAndUpdate({ id: bookid }, { paymentDone: true }).then(
      (book) => {
        res.status(200).json({ msg: "Payment Successful" });
      }
    );
  });
});

router.get("/getTransactions/:id", (req, res) => {
  let username = req.params.id;
  User.findOne({ username: username }).then((user) => {
    Pay.find({ name: username }).then((pay) => {
      res.status(200).json(pay);
    });
  });
});

module.exports = router;
