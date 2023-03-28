const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const fdb = require("../schemas/feedback");

router.get("/fd", async (req, res) => {
  await fdb.find()
  .sort({ createdAt: -1 })
  .limit(4)
  .populate('userDetails')
  .exec((err, feedbacks) => {
    if (err) {
      console.error(err);
      return;
    } else{
      res.status(200).json(feedbacks);
    }
  });
});

router.post("/fd", async (req, res) => {
  const username = req.body.username;
  const image = req.body.image;
  const det = req.body.fdbk;
  const user = await User.findOne({ username: username });
  const newfd = new fdb({
    image: image,
    username: username,
    feedback: det,
    userDetails: user,
  });
  if (user) {
    await User.findOneAndUpdate(
      { username: username },
      { feedbackgiven: true },
      async (err, doc) => {
        if (err) res.status(201).json({ error: "Some error incurred." });
        await newfd.save().then(() => {
          res
            .status(200)
            .json({ message: "Thank's for giving your feedback😎" });
        });
      }
    );
  }
});
module.exports = router;
