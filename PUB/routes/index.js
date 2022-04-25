const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fdb = require('../schemas/feed');
const User = require('../schemas/user');
const cont = require('../schemas/cont')
let mail=null
router.get('/index/:id',(req,res)=>{
    mail = req.params.id
    User.findOne({ email: mail})
    .then(user=>{
        res.render('index',{user})
    })

})

router.post('/con/:id',(req, res) => {
    mail = req.params.id
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.mail;
    const message = req.body.msg;
    const det = req.body.adddet;
    const newcon = new cont({
        firstname: fname,
        lastname: lname,
        mail: email,
       msg: message,
       add: det
    });
    //save user
    newcon.save().then(cont => {
        User.findOne({email:mail})
        .then(user=>{
            console.log(cont);
            res.render('index',{user});
        })
    })    
})

router.post('/fd/:id',(req, res) => {
    mail = req.params.id
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
        User.findOne({email:mail})
        .then(user=>{
            console.log(newfd);
            res.render('index',{user});
        })
        
    })    
})

module.exports = router;