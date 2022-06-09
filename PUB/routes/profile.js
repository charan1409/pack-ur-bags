const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../schemas/user');
const book = require('../schemas/book');
const fdb = require('../schemas/feed');

router.get('/profile/:id', (req, res) => {
    const username = req.params.id
    User.findOne({ username: username })
        .then(user => {
            book.find({ username: username })
                .then(bookings => {
                    fdb.find({username: username})
                        .then(feed=>{
                            res.render('profile', { user,model:bookings,feedmodel:feed })
                        })
                })
        })

})


module.exports = router;