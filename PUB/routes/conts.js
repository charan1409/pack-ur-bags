const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cont = require('../schemas/cont');

router.get('/views/index/con', (req, res) => res.render('con'));
router.post('/con',(req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.mail;
    const message = req.body.msg;
    const det = req.body.additional;
    const newcon = new cont({
        firstname: fname,
        lastname: lname,
        mail: email,
       msg: message,
       add: det
    });
    //save user
    newcon.save().then(cont => {
        console.log(cont);
        res.redirect('/');
    })    
})

module.exports = router;