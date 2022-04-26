const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const book = require('../schemas/book');
const User = require('../schemas/user');
const fdb = require('../schemas/feed');
const Admin = require('../schemas/admin');
let email = null;

// table data of users for admin
router.get('/users/:id', (req, res) => {
    email = req.params.id
    Admin.findOne({ email: email })
        .then(user => {
            User.find({}, (err, data) => {
                if (data) {
                    res.render('users', { user, model: data })
                } else {
                    console.log(err);
                }
            })
        })
})

router.get('/feedback/:id', (req, res) => {
    email = req.params.id
    Admin.findOne({ email: email })
        .then(user => {
            fdb.find({}, (err, data) => {
                if (data) {
                    res.render('feedback', { user, model: data })
                } else {
                    console.log(err);
                }
            })
        })
})

// profile of admin
router.get('/adminprofile/:id', (req, res) => {
    let mail = req.params.id
    User.findOne({ email: mail })
        .then(user => {
            res.render('adminprofile', { user })
        })
})

// table data of bookings for admin
router.get('/bookings/:id', (req, res) => {
    let mail = req.params.id
    Admin.findOne({ email: mail })
        .then(user => {
            book.find({}, (err, data) => {
                if (data) {
                    res.render('bookings', { user, model: data })
                } else {
                    console.log(err);
                }
            })
        })
})

// to remove users by backend
router.get('/remove/:id', (req, res) => {
    let mail = req.params.id
    User.findOneAndDelete({ email: mail }, (err, doc) => {
        book.deleteMany({ mail: mail }).then(function () {
            console.log('data deleted');
        })
        if (err) {
            console.log(err);
        } else {
            console.log("deleted" + doc);
        }
    })
    Admin.findOne({ email: email })
        .then(user => {
            User.find({}, (err, data) => {
                if (data) {
                    res.render('users', { user, model: data })
                } else {
                    console.log(err);
                }
            })
        })
})

// admin landing page
router.get('/adminland', (req, res) => {
    User.findOne({ email: email })
        .then(user => {
            res.render('adminland', { user })
        })
})

router.get('/adminland/:id', (req, res) => {
    let mail = req.params.id
    Admin.findOne({ email: mail })
        .then(user => {
            res.render('adminland', { user })
        })
})

router.get('/addadmin/:id', (req, res) => {
    let mail = req.params.id
    Admin.findOne({ email: mail })
        .then(user => {
            res.render('addadmin', { user })
        })
})

router.post('/add/:id', check('email').isEmail().normalizeEmail(), (req, res) => {
    let mail = req.params.id
    const inname = req.body.name;
    const inemail = req.body.email;
    const inpass1 = req.body.password1;
    const inpass2 = req.body.password2
    let errors = [];
    const mailerrors = validationResult(req);
    Admin.findOne({ email: mail })
        .then(user => {
            // res.render('addadmin', { user })
            // })
            // Email Format
            if (!mailerrors.isEmpty()) {
                errors.push({ msg: 'please use proper email' });
                res.render('addadmin', { errors, user })
            }

            //check required fields
            else if (!inname || !inemail || !inpass1 || !inpass2) {
                errors.push({ msg: 'please fill in all fields' });
                res.render('addadmin', { errors, user })
            }

            //check password match
            else if (inpass1 !== inpass2) {
                errors.push({ msg: 'Password do not match' });
                res.render('addadmin', { errors, user })
            }
            //check pass length
            else if (inpass1.length < 6) {
                errors.push({ msg: 'Password should be atleast 6 charcaters' });
                res.render('addadmin', { errors, user })
            }
            else {
                let u = 0
                User.findOne({ email: inemail })
                    .then(user1 => {
                        Admin.findOne({ email: inemail })
                            .then(admin1 => {
                                if (admin1) {
                                    //User exists
                                    console.log(user.email);
                                    u = 1
                                    errors.push({ msg: 'Email is already registered' });
                                    res.render('addadmin', { errors, user });
                                }
                                else if (user1) {
                                    //User exists
                                    u = 1
                                    console.log(user.email);
                                    errors.push({ msg: 'Email is already registered' });
                                    res.render('addadmin', { errors, user });
                                } else if(u == 0){
                                    console.log(inname);
                                    const newUser = new Admin({
                                        name: inname,
                                        email: inemail,
                                        password: inpass1
                                    });
                                    //save user
                                    newUser.save().then(user => {
                                        let sucerrors = []
                                        console.log(newUser);
                                        sucerrors.push({ sucmsg: 'Successful registration' });
                                        res.render('addadmin', { sucerrors, user });
                                    })
                                }
                            })
                            .catch(err => console.log(err));
                        });
                    }
                })
                .catch(err => console.log(err));
})

module.exports = router;