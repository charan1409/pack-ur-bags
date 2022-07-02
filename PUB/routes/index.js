const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fdb = require('../schemas/feed');
const User = require('../schemas/user');
const cont = require('../schemas/cont');
const cookieparser = require('cookie-parser');

router.use(cookieparser());
const verifier = require('../routes/verifier');

router.get('/index',verifier,(req,res)=>{
    email = req.user.id
    User.findOne({ email: email})
    .then(user=>{
        res.render('index',{user})
    })

})

router.post('/con',verifier,(req, res) => {
    let mail = req.user.id
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

router.post('/fd',verifier,(req, res) => {
    let email = req.user.id
    const det = req.body.details;
    const newfd = new fdb({
        email: email,
        detail: det
    });
    //save user
    newfd.save().then(fdb => {
        User.findOne({email:email})
        .then(user=>{
            res.render('index',{user});
        })
        
    })    
})

module.exports = router;