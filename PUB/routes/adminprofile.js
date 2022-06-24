const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')
const fs = require('fs')

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

router.post('/edit/:id',(req,res) => {
    const uname = req.params.id
    const name = req.body.upname
    const gender = req.body.upgender
    const phn = req.body.upphone
    const pass = req.body.pass
    let edit = []
    let editerr = []
    const newvals = {name: name,phone: phn, gender: gender}
    Admin.findOne({ username: uname})
    .then(user=>{
            if (!name || !gender || !phn || !pass){
                edit.push({msg:"edit your profile"})
                editerr.push({msg:"please fill in all details"})
                res.render('admineditprofile',{user,edit,editerr})
            }
            else if(user.password == pass){
                Admin.findOneAndUpdate({ username: uname},newvals,function(err,result){
                    if(err) throw err;
                    edit.push({msg2:"profile updated succesfully"})
                    Admin.findOne({ username: uname})
                        .then(user=>{
                            res.render('adminprofile',{user,edit})
                        })
                })
            } 
            else {
                edit.push({msg:"edit your profile"})
                editerr.push({msg:"incorrect password"})
                res.render('admineditprofile',{user,edit,editerr})
            }
        })
})

router.post('/changepass/:id',(req,res) => {
    const uname = req.params.id
    const pass = req.body.oldpass
    const pass1 = req.body.newpass1
    const pass2 = req.body.newpass2
    let change = []
    let changeerr = []
    const newvals = {password:pass1}
    Admin.findOne({ username: uname})
        .then(user=>{
            if (!pass || !pass1 || !pass2){
                change.push({msg:"change your password"})
                changeerr.push({msg:"please fill in all fields"})
                res.render('admineditprofile',{user,change,changeerr})
            }
            else if(user.password == pass & pass1 == pass2){
                Admin.findOneAndUpdate({ username: uname},newvals,function(err,result){
                    if(err) throw err;
                    change.push({msg2:"password updated succesfully"})
                    Admin.findOne({ username: uname})
                        .then(user=>{
                            res.render('adminprofile',{user,change})
                        })
                })
            } 
            else {
                change.push({msg:"change your password"})
                changeerr.push({msg:"incorrect password"})
                res.render('admineditprofile',{user,change,changeerr})
            }
        })
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

router.post('/upload/:id',upload.single('photo'),(req,res) => {
    const uname = req.params.id
    const pass = req.body.pass
    const pi = req.body.photo
    console.log(pi);
    let changep = []
    let proferr = []
    Admin.findOne({ username: uname})
        .then(user=>{
            if (!pass || !pi){
                changep.push({msg:"upload your profile photo"})
                proferr.push({msg:"please fill in all fields"})
                res.render('admineditprofile',{user,changep,proferr})
            }
            else if(user.password == pass){
                Admin.findOneAndUpdate({ username: uname},{image:req.file.filename},function(err,result){
                    if(err) throw err;
                    changep.push({msg2:"profile photo updated succesfully"})
                    Admin.findOne({ username: uname})
                        .then(user=>{
                            res.render('adminprofile',{user,changep})
                        })
                })
            } 
            else {
                changep.push({msg:"change your password"})
                proferr.push({msg:"incorrect password"})
                res.render('admineditprofile',{user,changep,proferr})
            }
        })
})

router.post('/remove/:id',upload.single('photo'),(req,res) => {
    const uname = req.params.id
    const pass = req.body.pass
    let removep = []
    let remerr = []
    const newvals = {image:null}
    Admin.findOne({ username: uname})
        .then(user=>{
            let pic = user.image
            if(user.password == pass){
                Admin.findOneAndUpdate({ username: uname},newvals,function(err,result){
                    if(err) throw err;
                    removep.push({msg2:"profile photo removed succesfully"})
                    Admin.findOne({ username: uname})
                        .then(user=>{
                            if(pic != null){
                                let filepath = path.join('\public\\uploads\\' + pic)
                                fs.unlink(filepath,(err)=>{
                                    if(err) throw err;
                                    console.log('profile photo deleted');
                                })
                            }
                            if (!pass){
                                removep.push({msg:"remove your profile photo"})
                                remerr.push({msg:"please fill in all fields"})
                                res.render('admineditprofile',{user,removep,remerr})
                            }
                            else {
                                res.render('adminprofile',{user,removep})
                            }
                        })
                })
            } 
            else {

                removep.push({msg:"change your password"})
                remerr.push({msg:"incorrect password"})
                res.render('admineditprofile',{user,removep,remerr})
            }
        })
})

module.exports = router;