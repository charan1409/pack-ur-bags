const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const hschema = require('../schemas/hotels.js');

router.get('/views/hotels', (req, res) => res.render('add'));
router.post('/add',(req, res) => {
    const pname = req.body.name;
    const h1 = req.body.h1;
    const h2 = req.body.h2;
    const h3 = req.body.h3;
    const newhs = new hschema({
        name: pname,
        hotel1: h1,
        hotel2: h2,
        hotel3: h3
    });
    //save user
    newhs.save().then(hschema => {
        console.log(newhs);
        res.redirect('/');
    })    
})

module.exports = router;