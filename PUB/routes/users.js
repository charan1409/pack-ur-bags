const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {check , validationResult} = require('express-validator');
const User = require('../schemas/user');
const Admin = require('../schemas/admin');

//login Page
router.get('/login', (req, res) => res.render('login'));

//register Page
router.get('/register', (req, res) => res.render('register'));

//  login handle
router.post('/login', (req, res) => {
    const inname = req.body.inname;
    const inpassword = req.body.inpass
    let errors = [];
    let u = 0;
    if (!inname || !inpassword) {
        errors.push({ msg: 'please fill in all fields' });
        res.render('login', { errors })
    }
    else {
        User.findOne({ username: inname })

            .then(user => {
                if (!user) {
                    u = 1
                }
                //Match Password
                if (user) {
                    if (inpassword === user.password && inpassword.length >= 6) {
                        res.render('index', { user });
                    }  
                    else {
                        errors.push({ msg: 'Incorrect password or email' });
                        res.render('login', { errors })
                    }
                }
                if(u!=0){
                    Admin.findOne({email: req.body.inname})
                        .then(user=>{
                            if(!user){
                                errors.push({ msg: 'email is not registerd' });
                                res.render('login', { errors });
                            }
                            if (user) {
                                if(inpassword === user.password){
                                    res.render('adminland',{ user });
                                } else {
                                    errors.push({ msg: 'Incorrect password or email' });
                                    res.render('login', { errors })
                                }
                            }
                        })
                }
            })
            .catch(err => console.log(err));
    }
})

//register handle
router.post('/register',check('upemail').isEmail().normalizeEmail(), (req, res) => {
    const inname = req.body.upname;
    const inemail = req.body.upemail;
    const inpass1 = req.body.uppass1;
    const inpass2 = req.body.uppass2
    let errors = [];
    const mailerrors = validationResult(req);
    // Email Format
    if (!mailerrors.isEmpty()) {
        errors.push({ msg: 'please use proper email' });
        res.render('register', { errors })
    }

    //check required fields
    else if (!inname || !inemail || !inpass1 || !inpass2) {
        errors.push({ msg: 'please fill in all fields' });
        res.render('register', { errors })
    }

    //check password match
    else if (inpass1 !== inpass2) {
        errors.push({ msg: 'Password do not match' });
        res.render('register', { errors })
    }
    //check pass length
    else if (inpass1.length < 6) {
        errors.push({ msg: 'Password should be atleast 6 charcaters' });
        res.render('register', { errors })
    }
    else {
        User.findOne({ email: inemail })
            .then(user => {
                if (user) {
                    //User exists
                    console.log(user.email);
                    errors.push({ msg: 'Email is already registered' });
                    res.render('register', { errors });
                } 
                User.findOne({ username: inname })
                    .then(user => {
                        if (user) {
                            //User exists
                            console.log(user.username);
                            errors.push({ msg: 'username is already exists' });
                            res.render('register', { errors });
                        }
                        else {
                            console.log(inname);
                            const newUser = new User({
                                username: inname,
                                email: inemail,
                                password: inpass1,
                                profileid: 0
                            });
                            //save user
                            newUser.save().then(user => {
                                let sucerrors = []
                                console.log(newUser);
                                sucerrors.push({ sucmsg: 'Successful registration' });
                                res.render('login',{sucerrors});
                            })
                                .catch(err => console.log(err));
                        }
                    });
            });
    }


});

// Home Page for printing name
router.get('/index/:id', (req, res) => {
    const email = req.params.id
    User.findOne({ email: email })
        .then(user => {
            res.render('index', { user })
        })

})

module.exports = router;