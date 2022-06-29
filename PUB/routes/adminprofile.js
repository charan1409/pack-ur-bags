const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const User = require('../schemas/user');
const book = require('../schemas/book');
const fdb = require('../schemas/feed');
const Admin = require('../schemas/admin');

router.get('/profile/:id', (req, res) => {
    const username = req.params.id
    Admin.findOne({ username: username })
        .then(user => {
            book.find({ username: username })
                .then(bookings => {
                    fdb.find({username: username})
                        .then(feed=>{
                            res.render('adminprofile', { user,model:bookings,feedmodel:feed })
                        })
                })
        })

})

router.get('/edit/:id',(req,res) => {
    const uname = req.params.id
    let edit = []
    Admin.findOne({ username: uname})
        .then(user=>{
            edit.push({ msg:"Edit Your Profile" })
            res.render('admineditprofile',{user,edit})
        })
})

router.get('/changepass/:id',(req,res) => {
    const uname = req.params.id
    let change = []
    Admin.findOne({ username: uname})
        .then(user=>{
            change.push({ msg:"Change your Password" })
            res.render('admineditprofile',{user,change})
        })
})

router.get('/upload/:id',(req,res)=>{
    const uname = req.params.id
    let changep = []
    Admin.findOne({ username: uname})
        .then(user=>{
            changep.push({ msg:"upload profile photo" })
            res.render('admineditprofile',{user,changep})
        })
})

router.get('/remove/:id',(req,res)=>{
    const uname = req.params.id
    let removep = []
    Admin.findOne({ username: uname})
        .then(user=>{
            removep.push({ msg:"remove profile photo" })
            res.render('admineditprofile',{user,removep})
        })
})

router.post('/edit/:id', async (req,res) => {
    const uname = req.params.id
    const name = req.body.upname
    const gender = req.body.upgender
    const phn = req.body.upphone
    const pass = req.body.pass
    let edit = []
    let editerr = []
    const newvals = {name: name,phone: phn, gender: gender}
    const user = await Admin.findOne({ username: uname});
    const validPass = await bcrypt.compare(pass, user.password);
    if(user){
        if (!name || !gender || !phn || !pass) {
            edit.push({ msg: "edit your profile" })
            editerr.push({ msg: "please fill in all details" })
            res.render('admineditprofile', { user, edit, editerr })
        }
        else if (validPass) {
            await Admin.findOneAndUpdate({ username: uname }, newvals, async function (err, result) {
                if (err) throw err;
                edit.push({ msg2: "profile updated succesfully" })
                await Admin.findOne({ username: uname })
                    .then(user => {
                        res.render('adminprofile', { user, edit })
                    })
            })
        }
        else {
            edit.push({ msg: "edit your profile" })
            editerr.push({ msg: "incorrect password" })
            res.render('admineditprofile', { user, edit, editerr })
        }
    }
})

router.post('/changepass/:id', async (req,res) => {
    const uname = req.params.id
    const pass = req.body.oldpass
    const pass1 = req.body.newpass1
    const pass2 = req.body.newpass2
    let change = []
    let changeerr = []
    const user = await Admin.findOne({ username: uname});
    const validPass = await bcrypt.compare(pass, user.password);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(pass1,salt);
    const newvals = {password:hashPassword};
    if(user){
        if (!pass || !pass1 || !pass2) {
            change.push({ msg: "change your password" })
            changeerr.push({ msg: "please fill in all fields" })
            res.render('admineditprofile', { user, change, changeerr })
        } else if (pass1.length < 6) {
            change.push({ msg: "change your password" })
            changeerr.push({ msg: "password must contain atleast 6 characters" })
            res.render('admineditprofile', { user, change, changeerr })
        } else if (!(pass1 === pass2)) {
            change.push({ msg: "change your password" })
            changeerr.push({ msg: "passwords do not match" })
            res.render('admineditprofile', { user, change, changeerr })
        }
        else if (validPass) {
            await Admin.findOneAndUpdate({ username: uname }, newvals, async function (err, result) {
                if (err) throw err;
                change.push({ msg2: "password updated succesfully" })
                await Admin.findOne({ username: uname })
                    .then(user => {
                        res.render('adminprofile', { user, change })
                    })
            })
        }
        else {
            change.push({ msg: "change your password" })
            changeerr.push({ msg: "incorrect password" })
            res.render('admineditprofile', { user, change, changeerr })
        }
    }
})

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename: function (req, file, callback) {
      callback(null, Date.now()+path.extname(file.originalname));
    }
  });

const upload = multer({storage:storage})

router.post('/upload/:id',upload.single('photo'),async (req,res) => {
    const uname = req.params.id
    const pass = req.body.pass
    let changep = []
    let proferr = []
    const user = await Admin.findOne({ username: uname});
    const validPass = await bcrypt.compare(pass, user.password);
    if(user){
        if (req.file === undefined) {
            console.log('pic not uploaded');
            changep.push({ msg: "upload your profile photo" })
            proferr.push({ msg: "please fill in all fields" })
            res.render('admineditprofile', { user, changep, proferr })
        }
        else if (!pass) {
            let filepath = path.join('\public\\uploads\\' + req.file.filename)
            fs.unlink(filepath, (err) => {
                if (err) throw err;
                console.log('profile photo deleted');
            })
            changep.push({ msg: "upload your profile photo" })
            proferr.push({ msg: "please fill in all fields" })
            res.render('admineditprofile', { user, changep, proferr })
        }
        else if (validPass) {
            await Admin.findOneAndUpdate({ username: uname }, { image: req.file.filename }, async function (err, result) {
                if (err) {
                    changep.push({ msg: "upload your profile photo" })
                    proferr.push({ msg: "please fill in all fields" })
                    res.render('admineditprofile', { user, changep, proferr })
                }
                changep.push({ msg2: "profile photo updated succesfully" })
                await Admin.findOne({ username: uname })
                    .then(user => {
                        res.render('adminprofile', { user, changep })
                    })
            })
        }
        else {
            changep.push({ msg: "change your password" });
            proferr.push({ msg: "incorrect password" });
            let filepath = path.join('\public\\uploads\\' + req.file.filename)
            fs.unlink(filepath, (err) => {
                if (err) throw err;
                console.log('profile photo not updated');
            })
            res.render('admineditprofile', { user, changep, proferr })
        }
    }
})

router.post('/remove/:id',upload.single('photo'),async (req,res) => {
    const uname = req.params.id
    const pass = req.body.pass
    let removep = []
    let remerr = []
    const newvals = {image:null}
    const user = await Admin.findOne({ username: uname});
    const validPass = await bcrypt.compare(pass, user.password);
    if(user){
        let pic = user.image
        if (validPass) {
            await Admin.findOneAndUpdate({ username: uname }, newvals,async function (err, result) {
                if (err) throw err;
                removep.push({ msg2: "profile photo removed succesfully" })
                await Admin.findOne({ username: uname })
                    .then(user => {
                        if (pic != null) {
                            let filepath = path.join('\public\\uploads\\' + pic)
                            fs.unlink(filepath, (err) => {
                                if (err) throw err;
                                console.log('profile photo deleted');
                            })
                        }
                        if (!pass) {
                            removep.push({ msg: "remove your profile photo" })
                            remerr.push({ msg: "please fill in all fields" })
                            res.render('admineditprofile', { user, removep, remerr })
                        }
                        else {
                            res.render('adminprofile', { user, removep })
                        }
                    })
            })
        }
        else {

            removep.push({ msg: "change your password" })
            remerr.push({ msg: "incorrect password" })
            res.render('admineditprofile', { user, removep, remerr })
        }
    }
})

module.exports = router;