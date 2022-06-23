const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')
const fs = require('fs')

const User = require('../schemas/user');
const book = require('../schemas/book');
const fdb = require('../schemas/feed');

router.get('/profile/:id', (req, res) => {
    const username = req.params.id
    User.findOne({ username: username })
        .then(user => {
            book.find({ username: username })
                .then(bookings => {
                    fdb.find({username: username})
                        .then(feed=>{
                            res.render('profile', { user,model:bookings,feedmodel:feed })
                        })
                })
        })

})

router.get('/edit/:id',(req,res) => {
    const uname = req.params.id
    let edit = []
    User.findOne({ username: uname})
        .then(user=>{
            edit.push({ msg:"Edit Your Profile" })
            res.render('editprofile',{user,edit})
        })
})

router.get('/changepass/:id',(req,res) => {
    const uname = req.params.id
    let change = []
    User.findOne({ username: uname})
        .then(user=>{
            change.push({ msg:"Change your Password" })
            res.render('editprofile',{user,change})
        })
})

router.get('/upload/:id',(req,res)=>{
    const uname = req.params.id
    let changep = []
    User.findOne({ username: uname})
        .then(user=>{
            changep.push({ msg:"upload profile photo" })
            res.render('editprofile',{user,changep})
        })
})

router.get('/remove/:id',(req,res)=>{
    const uname = req.params.id
    let removep = []
    User.findOne({ username: uname})
        .then(user=>{
            removep.push({ msg:"remove profile photo" })
            res.render('editprofile',{user,removep})
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
    User.findOne({ username: uname})
    .then(user=>{
            if (!name || !gender || !phn || !pass){
                edit.push({msg:"edit your profile"})
                editerr.push({msg:"please fill in all details"})
                res.render('editprofile',{user,edit,editerr})
            }
            else if(user.password == pass){
                User.findOneAndUpdate({ username: uname},newvals,function(err,result){
                    if(err) throw err;
                    edit.push({msg2:"profile updated succesfully"})
                    User.findOne({ username: uname})
                        .then(user=>{
                            res.render('profile',{user,edit})
                        })
                })
            } 
            else {
                edit.push({msg:"edit your profile"})
                editerr.push({msg:"incorrect password"})
                res.render('editprofile',{user,edit,editerr})
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
    User.findOne({ username: uname})
        .then(user=>{
            if (!pass || !pass1 || !pass2){
                change.push({msg:"change your password"})
                changeerr.push({msg:"please fill in all fields"})
                res.render('editprofile',{user,change,changeerr})
            }
            else if(user.password == pass & pass1 == pass2){
                User.findOneAndUpdate({ username: uname},newvals,function(err,result){
                    if(err) throw err;
                    change.push({msg2:"password updated succesfully"})
                    User.findOne({ username: uname})
                        .then(user=>{
                            res.render('profile',{user,change})
                        })
                })
            } 
            else {
                change.push({msg:"change your password"})
                changeerr.push({msg:"incorrect password"})
                res.render('editprofile',{user,change,changeerr})
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
    let changep = []
    let proferr = []
    User.findOne({ username: uname})
        .then(user=>{
            if (!pass || !pi){
                changep.push({msg:"upload your profile photo"})
                proferr.push({msg:"please fill in all fields"})
                res.render('editprofile',{user,changep,proferr})
            }
            else if(user.password == pass){
                User.findOneAndUpdate({ username: uname},{image:req.file.filename},function(err,result){
                    if(err) throw err;
                    changep.push({msg2:"profile photo updated succesfully"})
                    User.findOne({ username: uname})
                        .then(user=>{
                            res.render('profile',{user,changep})
                        })
                })
            } 
            else {
                changep.push({msg:"change your password"})
                proferr.push({msg:"incorrect password"})
                res.render('editprofile',{user,changep,proferr})
            }
        })
})

router.post('/remove/:id',upload.single('photo'),(req,res) => {
    const uname = req.params.id
    const pass = req.body.pass
    let removep = []
    let remerr = []
    const newvals = {image:null}
    User.findOne({ username: uname})
        .then(user=>{
            let pic = user.image
            if(user.password == pass){
                User.findOneAndUpdate({ username: uname},newvals,function(err,result){
                    if(err) throw err;
                    removep.push({msg2:"profile photo removed succesfully"})
                    User.findOne({ username: uname})
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
                                res.render('editprofile',{user,removep,remerr})
                            }
                            else {
                                res.render('profile',{user,removep})
                            }
                        })
                })
            } 
            else {

                removep.push({msg:"change your password"})
                remerr.push({msg:"incorrect password"})
                res.render('editprofile',{user,removep,remerr})
            }
        })
})

module.exports = router;