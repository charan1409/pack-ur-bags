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

router.get('/adminland',(req,res)=>{
    User.findOne({ email: email })
        .then(user => {
            res.render('adminland', { user })
        })
})

module.exports = router;