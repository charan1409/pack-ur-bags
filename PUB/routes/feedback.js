const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fdb = require('../schemas/feed');

router.get('/views/index/fd', (req, res) => res.render('fd'));
router.post('/fd',(req, res) => {
    const fname = req.body.fname;
    const mail = req.body.mail;
    const det = req.body.details;
    const newfd = new fdb({
        name: fname,
        email: mail,
        detail: det
    });
    //save user
    newfd.save().then(fdb => {
        console.log(newfd);
        res.redirect('/');
    })    
})

module.exports = router;