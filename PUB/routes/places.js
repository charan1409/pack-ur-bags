const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../schemas/user');

router.get('/beach/:id',(req,res)=>{
    const username = req.params.id
    User.findOne({ username: username})
    .then(user=>{
        res.render('beach',{user})
    })

})
router.get('/island/:id',(req,res)=>{
    const username = req.params.id
    User.findOne({ username: username})
    .then(user=>{
        res.render('island',{user})
    })

})
router.get('/countryside/:id',(req,res)=>{
    const username = req.params.id
    User.findOne({ username: username})
    .then(user=>{
        res.render('countryside',{user})
    })

})
router.get('/cultural/:id',(req,res)=>{
    const username = req.params.id
    User.findOne({ username: username})
    .then(user=>{
        res.render('cultural',{user})
    })

})
router.get('/desert/:id',(req,res)=>{
    const username = req.params.id
    User.findOne({ username: username})
    .then(user=>{
        res.render('desert',{user})
    })

})
router.get('/forest/:id',(req,res)=>{
    const username = req.params.id
    User.findOne({ username: username})
    .then(user=>{
        res.render('forest',{user})
    })

})
router.get('/hillstation/:id',(req,res)=>{
    const username = req.params.id
    User.findOne({ username: username})
    .then(user=>{
        res.render('hillstation',{user})
    })

})
router.get('/winter/:id',(req,res)=>{
    const username = req.params.id
    User.findOne({ username: username})
    .then(user=>{
        res.render('winter',{user})
    })

})
router.get('/book/:id',(req,res)=>{
    const username = req.params.id
    User.findOne({ username: username})
    .then(user=>{
        res.render('book',{user})
    })

})

module.exports = router;