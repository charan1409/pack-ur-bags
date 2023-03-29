const express = require("express");
const router = express.Router();
const cookieparser = require("cookie-parser");
router.use(cookieparser());

const User = require("../schemas/user");
const Place = require("../schemas/place");
const Review = require("../schemas/reviews");
const Book = require("../schemas/book");

router.get("/places/:id", async (req, res) => {
  const category = req.params.id;
  if (category === "all") {
    await Place.find({}, (err, data) => {
      if (err) res.status(201).json({ error: "some error incurred." });
      res.status(200).json(data);
    });
  } else if (category) {
    await Place.find({ category: category }, (err, data) => {
      if (err) res.status(201).json({ error: "some error incurred." });
      res.status(200).json(data);
    });
  } else res.status(201).json({ error: "some error incurred." });
  //   }
});

router.get("/placedetails/:id", async (req, res) => {
  const placeid = req.params.id;
  await Place.findOne({ id: placeid }, (err, data) => {
    if (err) res.status(201).json({ error: "Some error incurred." });
    else {
      Review.find({ placeid: placeid }).then((reviews) => {
        const totalDetails = {
          placeDetails: data,
          reviews: reviews,
        };
        res.status(200).json(totalDetails);
      });
    }
  });
  // }
});

router.post("/review", async (req, res) => {
  const username = req.body.username;
  const bookid = req.body.bookid;
  const user = await User.findOne({ username: username });
  const rating = req.body.rating;
  const review = req.body.review;
  if (user) {
    Book.findOne({ id: bookid })
      .populate("placedetails")
      .exec((err, data) => {
        if (err) console.error(err);
        else {
          Place.findOne({ id: data.placedetails.id }, (err, place) => {
            if (err) console.error(err);
            else {
              const new_reviews = []
              if(place && place.reviews) place.reviews.forEach((review) => {
                new_reviews.push(review);
              });
              const new_review = {
                userDetail: user,
                rating: rating,
                review: review,
              };
              new_reviews.push(new_review);
              Place.findOneAndUpdate(
                { id: data.placedetails.id },
                { reviews: new_reviews },
                (err, data) => {
                  if (err) console.error(err);
                  else {
                    Book.findOneAndUpdate(
                      { id: bookid },
                      { reviewGiven: true },
                      (err, data) => {
                        if (err) console.error(err);
                        else {
                          res.status(200).json({ msg: "Review added successfully." });
                        }
                      });
                  }
                }
              );
            }
          });
        }
      });
  } else res.status(201).json({ error: "Some error incurred." });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  Book.findOneAndDelete({ id: id }, (err, data) => {
    if (err) res.status(201).json({ error: "some error incurred." });
    else res.status(200).json({ msg: "Booking deleted successfully." });
  });
});

module.exports = router;
