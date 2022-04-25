const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const book = require('../schemas/book');
const User = require('../schemas/user');
let email = null;

router.get('/users/:id',(req,res)=>{
    email = req.params.id
    User.find({},(err,data)=>{
        if(data){
            res.render('users',{model: data})
        } else{
            console.log(err);
        }
    })
})
router.get('/adminprofile/:id',(req,res)=>{
    let mail = req.params.id
    User.findOne({ email: mail})
    .then(user=>{
        res.render('adminprofile',{user})
    })
})
router.get('/bookings/:id',(req,res)=>{
    let mail = req.params.id
    User.findOne({ email: mail})
    .then(user=>{
        book.find({},(err,data)=>{
            if(data){
                res.render('bookings',{user,model: data})
            } else{
                console.log(err);
            }
        })
    })
    // book.find({},(err,data)=>{
    //     if(data){
    //         res.render('bookings',{model: data})
    //     } else{
    //         console.log(err);
    //     }
    // })
})
router.get('/remove/:id',(req,res)=>{
    let mail = req.params.id
    User.findOneAndDelete({email: mail},(err,doc)=>{
        if(err){
            console.log(err);
        } else {
            console.log("deleted"+doc);
        }
    })
    User.find({},(err,data)=>{
        if(data){
            res.render('users',{model: data})
        } else{
            console.log(err);
        }
    })
})

router.get('/adminland',(req,res)=>{
    User.findOne({ email: email })
        .then(user => {
            res.render('adminland', { user })
        })
})

router.get('/adminland/:id',(req,res)=>{
    let mail = req.params.id
    User.findOne({ email: mail })
        .then(user => {
            res.render('adminland', { user })
        })
})

module.exports = router;