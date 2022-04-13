const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cont = require('../schemas/cont');

router.get('/views/index/con', (req, res) => res.render('con'));
router.post('/con',(req, res) => {
    // const fname = req.body.fname;
    // const mail = req.body.mail;
    // const det = req.body.details;
    const newcon = new cont({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.mail,
        message: req.body.msg,
        detail: req.body.adddet
    });
    //save user
    newcon.save().then(cont => {
        console.log(cont);
        res.redirect('/');
    })    
})

module.exports = router;