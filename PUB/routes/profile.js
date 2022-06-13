const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

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

router.post('/edit/:id',(req,res) => {
    const uname = req.params.id
    const name = req.body.upname
    const email = req.body.upemail
    const phn = req.body.upphone
    const pass = req.body.pass
    let edit = []
    let editerr = []
    const newvals = {name: name,phone: phn, email: email}
    User.findOne({ username: uname})
    .then(user=>{
            if (!name || !email || !phn || !pass){
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

module.exports = router;