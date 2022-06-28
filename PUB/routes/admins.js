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
    let username = req.params.id
    Admin.findOne({ username: username })
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
    let username = req.params.id
    Admin.findOne({ username: username })
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
    let username = req.params.id
    Admin.findOne({ username: username })
        .then(user => {
            res.render('adminprofile', { user })
        })
})

// table data of bookings for admin
router.get('/bookings/:id', (req, res) => {
    let username = req.params.id
    Admin.findOne({ username: username })
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
router.get('/remove/:id/:id2', (req, res) => {
    let username = req.params.id
    let adminname = req.params.id2
    User.findOneAndDelete({ username: username }, (err, doc) => {
        book.deleteMany({ username: username }).then(function () {
            console.log('data deleted');
        })
        if (err) {
            console.log(err);
        } else {
            console.log("deleted" + doc);
        }
    })

    Admin.findOne({ username: adminname })
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
    let username = req.params.id
    Admin.findOne({ username: username })
        .then(user => {
            res.render('adminland', { user })
        })
})

router.get('/addadmin/:id', (req, res) => {
    let username = req.params.id
    Admin.findOne({ username: username })
        .then(user => {
            res.render('addadmin', { user })
        })
})

router.get('/place/:id', (req, res) => {
    let username = req.params.id
    Admin.findOne({ username: username })
        .then(user => {
            res.render('adminplace', { user })
        })
})

router.post('/add/:id', check('email').isEmail().normalizeEmail(), (req, res) => {
    let username = req.params.id
    const inname = req.body.name;
    const inemail = req.body.email;
    const inpass1 = req.body.password1;
    const inpass2 = req.body.password2
    let errors = [];
    const mailerrors = validationResult(req);
    Admin.findOne({ username: username })
        .then(user => {
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
                User.findOne({ username: inname }).then(user1 => {
                        if (user1) {
                            errors.push({ msg: 'username already exists' });
                            res.render('addadmin', { errors, user });
                        }
                        Admin.findOne({ username: inname }).then(admin1 => {
                                if (admin1) {
                                    errors.push({ msg: 'username already exists' });
                                    res.render('addadmin', { errors, user });
                                }
                                User.findOne({email:inemail}).then(user2 =>{
                                    if(user2){
                                        errors.push({msg:'email is already registered'});
                                        res.render('addadmin',{errors,user});
                                    }
                                    Admin.findOne({email:inemail}).then(admin2 =>{
                                        if(admin2){
                                            errors.push({msg:'email is already registered'});
                                            res.render('addadmin',{errors,user});
                                        } else{
                                            const newAdmin = new Admin({
                                                username: inname,
                                                email: inemail,
                                                password: inpass1
                                            });
                                            //save user
                                            newAdmin.save().then(admin => {
                                                let sucerrors = []
                                                sucerrors.push({ sucmsg: 'Registered successfully' });
                                                res.render('addadmin',{sucerrors,user});
                                            })
                                                .catch(err => console.log(err));
                                        }
                                    })
                                })
                            })
                            .catch(err => console.log(err));
                        });
                    }
                })
                .catch(err => console.log(err));
})

module.exports = router;