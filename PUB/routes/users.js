const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../schemas/user');

//login Page
router.get('/login', (req, res) => res.render('login'));

//register Page
router.get('/register', (req, res) => res.render('register'));

//  login handle
router.post('/login', (req, res) => {
    const inemail = req.body.inemail;
    const inpassword = req.body.inpass
    let errors = [];
    User.findOne({ email: req.body.inemail })

        .then(user => {
            if (!user) {
                errors.push({ msg: 'email is not registerd' });
                res.render('login', { errors });

            }
            //Match Password
            if(user){
                if (inpassword === user.password) {
                    res.render('index',{user});
                } else {
                    errors.push({ msg: 'Incorrect password or email' });
                    res.render('login', { errors })
                }
            }
        })
        .catch(err => console.log(err));
})

//register handle
router.post('/register', (req, res) => {
    const inname = req.body.upname;
    const inemail = req.body.upemail;
    const inpass1 = req.body.uppass1;
    const inpass2 = req.body.uppass2
    let errors = [];
    //check required fields
    if (!inname || !inemail || !inpass1 || !inpass2) {
        errors.push({ msg: 'please fill in all fields' });
        res.render('register', { errors })
    }

    //check password match
    if (inpass1 !== inpass2) {
        errors.push({ msg: 'Password do not match' });
        res.render('register', { errors })
    }
    //check pass length
    if (inpass1.length < 6) {
        errors.push({ msg: 'Password should be atleast 6 charcaters' });
        res.render('register', { errors })
    }
    else{
        User.findOne({ email: inemail })
        .then(user => {
            if (user) {
                //User exists
                console.log(user.email);
                errors.push({msg:'Email is already registered'});
                res.render('register', { errors });
            } else {
                console.log(inname);
                const newUser = new User({
                    name: inname,
                    email: inemail,
                    password: inpass1
                });
                //save user
                newUser.save().then(user => {
                    console.log(newUser);
                    res.redirect('/login');
                })
                    .catch(err => console.log(err));
            }
        });
    }
    

});

//login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Handle
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logout');
    res.redirect('/users/login');
});



module.exports = router;