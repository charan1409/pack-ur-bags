const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../schemas/user');
const book = require('../schemas/book');
router.get('/profile/:id', (req, res) => {
    const email = req.params.id
    User.findOne({ email: email })
        .then(user => {
            book.find({ mail: email })
                .then(bookings => {
                    res.render('profile', { user,model:bookings })
                })
        })

})


module.exports = router;