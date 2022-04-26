const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const book = require('../schemas/book');
const User = require('../schemas/user');
const Admin = require('../schemas/admin');
let email = null;

router.get('/users/:id',(req,res)=>{
    email = req.params.id
    Admin.findOne({email:email})
     .then(user=>{
         User.find({},(err,data)=>{
             if(data){
                 res.render('users',{user,model: data})
             } else{
                 console.log(err);
             }
         })
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
    Admin.findOne({ email: mail})
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
        book.deleteMany({mail:mail}).then(function(){
            console.log('data deleted');
        })
        if(err){
            console.log(err);
        } else {
            console.log("deleted"+doc);
        }
    })
    Admin.findOne({ email: email})
    .then(user=>{
        User.find({},(err,data)=>{
            if(data){
                res.render('users',{user,model: data})
            } else{
                console.log(err);
            }
        })
    })
    // User.find({},(err,data)=>{
    //     if(data){
    //         res.render('users',{model: data})
    //     } else{
    //         console.log(err);
    //     }
    // })
})

router.get('/adminland',(req,res)=>{
    User.findOne({ email: email })
        .then(user => {
            res.render('adminland', { user })
        })
})

router.get('/adminland/:id',(req,res)=>{
    let mail = req.params.id
    Admin.findOne({ email: mail })
        .then(user => {
            res.render('adminland', { user })
        })
})

module.exports = router;