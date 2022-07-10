const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult, cookie } = require('express-validator');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
router.use(cookieparser());

const book = require('../schemas/book');
const User = require('../schemas/user');
const fdb = require('../schemas/feed');
const Admin = require('../schemas/admin');
const Place = require('../schemas/place');
const adminverifier = require('../routes/adminverifier');

// table data of users for admin
router.get('/users',adminverifier, (req, res) => {
    let email = req.user.id
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

router.get('/feedback',adminverifier, (req, res) => {
    let email = req.user.id
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
router.get('/adminprofile',adminverifier, (req, res) => {
    let email = req.user.id
    Admin.findOne({ email: email })
        .then(user => {
            res.render('adminprofile', { user })
        })
})

// table data of bookings for admin
router.get('/bookings',adminverifier, (req, res) => {
    let email = req.user.id
    Admin.findOne({ email: email })
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
router.get('/remove/:id',adminverifier, (req, res) => {
    let email = req.params.id
    let adminemail = req.user.id
    User.findOneAndDelete({ email: email }, (err, doc) => {
        book.deleteMany({ email: email });
        if (err) {
            console.log(err);
        } else {
            console.log("deleted" + doc);
        }
    })

    Admin.findOne({ email: adminemail })
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

router.get('/adminremove/:id',adminverifier, (req, res) => {
    let email = req.params.id
    let adminemail = req.user.id
    Admin.findOneAndDelete({ email: email }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log("deleted" + doc);
        }
    })

    const user = Admin.findOne({ email: adminemail });
    if(user){
        User.find({}, (err, data) => {
            if (data) {
                res.render('admins', { user, model: data })
            } else {
                console.log(err);
            }
        })
    } else {
        res.render('/logout')
    }
})

router.get('/adminland',adminverifier, (req, res) => {
    let email = req.user.id
    Admin.findOne({ email: email })
        .then(user => {
            res.render('adminland', { user })
        })
})

router.get('/addadmin',adminverifier, (req, res) => {
    let email = req.user.id
    Admin.findOne({ email: email })
        .then(user => {
            res.render('addadmin', { user })
        })
})

router.get('/admin',adminverifier, (req, res) => {
    let email = req.user.id
    Admin.findOne({ email: email })
        .then(user => {
            Admin.find({user:"admin"}, (err, data) => {
                if (data) {
                    res.render('admins', { user, model: data })
                } else {
                    console.log(err);
                }
            })
        })
})

router.get('/place',adminverifier, (req, res) => {
    let email = req.user.id
    Admin.findOne({ email: email })
        .then(user => {
            Place.find({}, (err, data) => {
                if (data) {
                    res.render('adminplace', { user, model: data })
                } else {
                    console.log(err);
                }
            })
        })
})

router.get('/addplace',adminverifier, (req, res) => {
    let email = req.user.id
    Admin.findOne({ email: email })
        .then(user => {
            res.render('admineditplace', { user })
                
        })
})

router.post('/add',adminverifier, check('email').isEmail().normalizeEmail(), async (req, res) => {
    let email = req.user.id
    const inname = req.body.name;
    const inemail = req.body.email;
    const inpass1 = req.body.password1;
    const inpass2 = req.body.password2;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(inpass1,salt);
    let errors = [];
    const mailerrors = validationResult(req);
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
    const user = await Admin.findOne({ email: email });
    if (user) {
        const user1 = await User.findOne({ email: inname });
        const admin1 = await Admin.findOne({ email: inname });
        const user2 = await User.findOne({ email: inemail });
        const admin2 = await Admin.findOne({ email: inemail });
        if (user1 || admin1) {
            errors.push({ msg: 'email already exists' });
            res.render('addadmin', { errors, user });
        }
        else if (user2 || admin2) {
            errors.push({ msg: 'email is already registered' });
            res.render('addadmin', { errors, user });
        }
        else {
            const newAdmin = new Admin({
                username: inname,
                email: inemail,
                user: "admin",
                password: hashPassword
            });
            //save user
            await newAdmin.save().then(async admin => {
                const id = admin.email;
                const token = await jwt.sign({id},process.env.ADMIN_TOKEN,{expiresIn:'1h'});
                res.cookie("token",token,{httpOnly: true});
                let sucerrors = []
                sucerrors.push({ sucmsg: 'Registered successfully' });
                res.render('addadmin', { sucerrors, user });
            })
            .catch(err => console.log(err));
        }
    }
})

module.exports = router;