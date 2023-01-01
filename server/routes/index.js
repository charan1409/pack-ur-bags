const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const fdb = require('../schemas/feedback');

router.post('/fd',async (req, res) => {
    const username = req.body.username;
    const image = req.body.image;
    const det = req.body.fdbk;
    const user = User.findOne({username:username});
    const newfd = new fdb({
        image: image,
        username: username,
        feedback: det
    });
    if(user){
        await User.findOneAndUpdate(
            { username: username },
            { feedbackgiven: true }
          );
        await newfd.save().then(() => {
            res.status(200).json({ success: "submitted Successfully"});
        })
    }    
})
module.exports = router;