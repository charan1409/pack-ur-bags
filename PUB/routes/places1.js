const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const plc = require('../schemas/places1');

router.get('/views/places', (req, res) => res.render('find'));
router.post('/find',(req, res) => {
    const pname = req.body.name;
    const about = req.body.about;
    const rate = req.body.rating;
    const cost = req.body.price;
    const avail = req.body.avail;
    const newpc = new plc({
        place: pname,
        description: about,
        rating: rate,
        price:cost,
        availability:avail
    });
    //save user
    newpc.save().then(plc => {
        console.log(newpc);
        res.redirect('/');
    })    
})

module.exports = router;