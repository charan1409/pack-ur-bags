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
            res.render('addplace', { user })
                
        })
})

router.get('/removeplace/:id',adminverifier, (req, res) => {
    let email = req.user.id;
    const id = req.params.id;
    Admin.findOne({ email: email })
        .then(user => {
            place.findOneAndDelete({id: id}).then(place=>{
                if(place.photo != null){
                    let filepath = path.join('\public\\places\\' + place.photo)
                    fs.unlink(filepath, (err) => {
                        if (err) throw err;
                        console.log('photo deleted');
                    })
                }
                console.log(id+' deleted.');
            })
            place.find({}, (err, data) => {
                if (data) {
                    res.render('adminplace', { user, model: data })
                } else {
                    console.log(err);
                }
            })
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
    const category = req.body.category;
    const about = req.body.details;
    const password = req.body.password;
    const id2 = pname.replace(/ /g,"");
    const id = category +"&"+ id2;
    let errors = []
    const user = await Admin.findOne({ email: email});
    const validPass = await bcrypt.compare(password, user.password);
    if(user){
        if (!pname || !about || !password) {
            let filepath = path.join('\public\\places\\' + req.file.filename)
            fs.unlink(filepath, (err) => {
                if (err) throw err;
                console.log('photo deleted');
            })
            errors.push({ msg: "please fill in all details" })
            res.render('addplace', { user, errors })
        }
        else if (validPass) {
            const newplace = new place({
                id: id,
                to: pname,
                category: category,
                details: about,
                photo: req.file.filename
            });
            //save user
            newplace.save().then(plc => {
                errors.push({ msg: "successfully added" })
                res.render('addplace', { user, errors })
            }) 
        }
        else {
            let filepath = path.join('\public\\places\\' + req.file.filename)
            fs.unlink(filepath, (err) => {
                if (err) throw err;
                console.log('photo deleted');
            })
            errors.push({ msg: "incorrect password" })
            res.render('addplace', { user, errors })
        }
    }   
})

module.exports = router;