const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Pay = require("../schemas/payment");
const User = require("../schemas/user");
const Place = require("../schemas/place");
const Book = require("../schemas/book");

router.get("/views/payment", (req, res) => res.render("payment"));
router.get("/pay/:id", (req, res) => {
  let bookid = req.params.id;
  Book.findOne({ id: bookid }).then((book) => {
    var numberOfpassengers1 = book.numberOfpassengers;
    console.log(book.numberOfpassengers);
    Place.findOne({ id: book.placeid }).then((place) => {
      const det = {
        from: place.from,
        to: place.to,
        price: place.price,
        numberOfpassengers: numberOfpassengers1,
      };
      console.log(det);
      res.status(200).json(det);
    });
  });
});

router.get("/mybookings/:id", async (req, res) => {
  let username = req.params.id;
  try {
    const bookings = await Book.find({ username: username });
    const tours = [];
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].paymentDone === false) {
        const place = await Place.findOne({ id: bookings[i].placeid });
        const det = {
          id: bookings[i].id,
          from: place.from,
          to: place.to,
          price: place.price,
          numberOfpassengers: bookings[i].numberOfpassengers,
          fromdate: bookings[i].fromdate,
          todate: bookings[i].todate,
          passengers: bookings[i].passengers,
        };
        tours.push(det);
      }
    }
    res.status(200).json(tours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
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
