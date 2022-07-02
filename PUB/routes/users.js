const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const {check , validationResult} = require('express-validator');
const User = require('../schemas/user');
const Admin = require('../schemas/admin');

router.use(cookieparser());

//login Page
router.get('/login', (req, res) => res.render('login'));

//register Page
router.get('/register', (req, res) => res.render('register'));

//  login handle
router.post('/login', async (req, res) => {
    const inname = req.body.inname;
    const inpassword = req.body.inpass
    let errors = [];
    if (!inname || !inpassword) {
        errors.push({ msg: 'please fill in all fields' });
        res.render('login', { errors })
    }
    else {
        const user = await User.findOne({ username: inname });
        if (!user) {
            const admin = await Admin.findOne({ username: inname });
            if (!admin) {
                errors.push({ msg: 'email is not registerd' });
                res.render('login', { errors });
            }
            if (admin) {
                const validAdminPass = await bcrypt.compare(inpassword, admin.password);
                if (validAdminPass) {
                    const id = admin.email;
                    const token = await jwt.sign({id},process.env.ADMIN_TOKEN,{expiresIn:'1d'});
                    res.cookie("token",token,{httpOnly: true});
                    res.render('adminland', { user: admin });
                } else {
                    errors.push({ msg: 'Incorrect username or password' });
                    res.render('login', { errors })
                }
            }
        }
        else {
            const validPass = await bcrypt.compare(inpassword, user.password);
            if (validPass) {
                const id = user.email;
                const token = await jwt.sign({id},process.env.ACCESS_TOKEN,{expiresIn:'1d'});
                res.cookie("token",token,{httpOnly: true});
                res.render('index', { user });
            }
            else {
                errors.push({ msg: 'Incorrect username or password' });
                res.render('login', { errors })
            }
        }
    }
})

//register handle
router.post('/register',check('upemail').isEmail().normalizeEmail(), async (req, res) => {
    const inname = req.body.upname;
    const inemail = req.body.upemail;
    const inpass1 = req.body.uppass1;
    const inpass2 = req.body.uppass2;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(inpass1,salt);
    let errors = [];
    const mailerrors = validationResult(req);
    // Email Format
    if (!mailerrors.isEmpty()) {
        errors.push({ msg: 'invalid email' });
        res.render('register', { errors })
    }

    //check required fields
    else if (!inname || !inemail || !inpass1 || !inpass2) {
        errors.push({ msg: 'please fill in all fields' });
        res.render('register', { errors })
    }

    //check password match
    else if (inpass1 !== inpass2) {
        errors.push({ msg: 'Passwords do not match' });
        res.render('register', { errors })
    }
    //check pass length
    else if (inpass1.length < 6) {
        errors.push({ msg: 'Password should be atleast 6 charcaters' });
        res.render('register', { errors })
    }
    else {
        const user = await User.findOne({ username: inname });
        const user1 = await User.findOne({ email: inemail });
        const admin = await Admin.findOne({username:inname});
        const admin1 = await Admin.findOne({email:inemail});
        if(admin || user){
            errors.push({msg: 'username already exists'});
            res.render('register',{errors})
        }
        else if(admin1 || user1){
            errors.push({msg: 'Email is already registered'})
            res.render('register',{errors})
        }
        else{
            const newUser = new User({
                username: inname,
                email: inemail,
                password: hashPassword
            });
            try{
                await newUser.save().then(async user => {
                    const id = user.email;
                    const token = await jwt.sign({id},process.env.ACCESS_TOKEN,{expiresIn:'1d'});
                    res.cookie("token",token,{httpOnly: true,});
                    let sucerrors = []
                    sucerrors.push({ sucmsg: 'Successful registration' });
                    res.render('index',{user});
                })
            } catch(err){
                res.status(404).json('token not created');
            }
        }
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