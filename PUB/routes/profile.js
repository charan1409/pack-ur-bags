const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../schemas/user');
const book = require('../schemas/book');
const fdb = require('../schemas/feed');

router.get('/profile/:id', (req, res) => {
    const email = req.params.id
    User.findOne({ email: email })
        .then(user => {
            book.find({ mail: email })
                .then(bookings => {
                    fdb.find({email: email})
                        .then(feed=>{
                            console.log(feed);
                            res.render('profile', { user,model:bookings,feedmodel:feed })
                        })
                })
        })

})


module.exports = router;