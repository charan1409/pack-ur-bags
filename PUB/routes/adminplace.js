const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const cookieparser = require('cookie-parser');
router.use(cookieparser());

const Admin = require('../schemas/admin');
const place = require('../schemas/place');
const adminverifier = require('./adminverifier');

router.get('/addplace',adminverifier, (req, res) => {
    let email = req.user.id;
    Admin.findOne({ email: email })
        .then(user => {
            res.render('admineditplace', { user })
                
        })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/places')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage:storage})

router.post('/addplace',adminverifier,upload.single('photo'), async (req, res) => {
    let email = req.user.id;
    const pname = req.body.to;
    const about = req.body.details;
    const password = req.body.password;
    let errors = []
    const user = await Admin.findOne({ email: email});
    const validPass = await bcrypt.compare(password, user.password);
    if(user){
        if (!pname || !about || !password) {
            errors.push({ msg: "please fill in all details" })
            res.render('admineditplace', { user, errors })
        }
        else if (validPass) {
            const newplace = new place({
                to: pname,
                details: about,
                photo: req.file.filename
            });
            //save user
            newplace.save().then(plc => {
                console.log(plc);
                errors.push({ msg: "successfully added" })
                res.render('admineditplace', { user, errors })
            }) 
        }
        else {
            errors.push({ msg: "incorrect password" })
            res.render('admineditplace', { user, errors })
        }
    }   
})

module.exports = router;