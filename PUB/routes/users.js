const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {check , validationResult} = require('express-validator');
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
    check('inemail').isEmail()
    if (!inemail || !inpassword) {
        errors.push({ msg: 'please fill in all fields' });
        res.render('login', { errors })
    } else if(validationResult(req) != null){
        errors.push({msg : 'invalid email'});
        res.render('login',{errors})
    }
    // let mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    // if (!(inemail.match(mailformat))) {
    //     errors.push({ msg: 'invalid email' });
    //     res.render('login', { errors });
    // }
    else {
        User.findOne({ email: req.body.inemail })

            .then(user => {
                if (!user) {
                    errors.push({ msg: 'email is not registerd' });
                    res.render('login', { errors });

                }
                //Match Password
                if (user) {
                    if (inpassword === user.password && inpassword.length >= 6) {
                        res.render('index', { user });
                    } else if(inpassword === user.password && inpassword.length < 6){
                        console.log("admin called");
                        res.render('adminland',{ user });
                    } else {
                        errors.push({ msg: 'Incorrect password or email' });
                        res.render('login', { errors })
                    }
                }
            })
            .catch(err => console.log(err));
    }
})

//register handle
router.post('/register', (req, res) => {
    const inname = req.body.upname;
    const inemail = req.body.upemail;
    const inpass1 = req.body.uppass1;
    const inpass2 = req.body.uppass2
    let errors = [];

    // Email Format
    check('inemail').isEmail()
    if (validationResult(req) != null) {
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
                        errors.push({ msg: 'Successful registration' });
                        res.render('login',{errors});
                    })
                        .catch(err => console.log(err));
                }
            });
    }


});

//login Handle
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/dashboard',
//         failureRedirect: '/users/login',
//         failureFlash: true
//     })(req, res, next);
// });

router.get('/index/:id', (req, res) => {
    const email = req.params.id
    User.findOne({ email: email })
        .then(user => {
            res.render('index', { user })
        })

})

//Logout Handle
// router.get('/logout', (req, res) => {
//     req.logOut();
//     req.flash('success_msg', 'You are logout');
//     res.redirect('/users/login');
// });



module.exports = router;