const express = require("express");
const router = express.Router();
const cookieparser = require("cookie-parser");
router.use(cookieparser());

const User = require("../schemas/user");
const Place = require("../schemas/place");

const verifier = require("../routes/verifier");

router.get("/places/:id", async (req, res) => {
  const category = req.params.id;
  if (category === "all") {
    // const user = await User.findOne({ username: username });
    // if (user) {
      await Place.find({},(err,data) => {
        if(err) res.status(201).json({error: "some error incurred."})
        res.status(200).json(data);
      });
    }
    else if(category){
      await Place.find({category:category},(err,data)=>{
        if(err) res.status(201).json({error: "some error incurred."})
        res.status(200).json(data);
      })
    } else res.status(201).json({error: "some error incurred."})
//   }
});

router.get("/viewplace/:id", verifier, async (req, res) => {
  const email = req.user.id;
  const placeid = req.params.id;
  const user = await User.findOne({ email: email });
  if (user) {
    const data = await Place.findOne({ id: placeid });
    res.render("place", { user, data });
  }
});

router.post("/review/:id", verifier, async (req, res) => {
  const email = req.user.id;
  const placeid = req.params.id;
  const user = await User.findOne({ email: email });
  const rating = req.body.rating;
  const review = req.body.review;
  const feedback = [];
  const reviewrating = [];
  if (user) {
    feedback.push({ placeid, user, rating, review });
    reviewrating.push({ placeid, rating, review });
    console.log(feedback);
    const updated = await Place.findOneAndUpdate(
      { id: placeid },
      { reviews: feedback }
    );
    if (updated) {
      await User.findOneAndUpdate(
        { email: email },
        { tourReview: reviewrating }
      );
      const data = await Place.findOne({ id: placeid });
      res.render("place", { user, data, rating });
    }
  }
});

module.exports = router;
