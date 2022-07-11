const express = require('express');
const router = express.Router();
const cookieparser = require('cookie-parser');
router.use(cookieparser());

const User = require('../schemas/user');
const Place = require('../schemas/place');

const verifier = require('../routes/verifier');

router.get('/viewplaces/:id',verifier,(req,res)=>{
    const email = req.user.id;
    const category = req.params.id;
    const user = User.findOne({ email: email});
    if(user){
        Place.find({category: category}).then(data=>{
            res.render('viewplaces',{data,category});
        })
    }
})

router.get('/viewplace/:id',verifier,(req,res)=>{
    const email = req.user.id;
    const place = req.params.id;
    const user = User.findOne({ email: email});
    if(user){
        Place.find({id: place}).then(data=>{
            res.render('place',{data});
        })
    }
})

module.exports = router;