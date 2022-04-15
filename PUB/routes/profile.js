const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../schemas/user');
router.get('/profile/:id',(req,res)=>{
    const email = req.params.id
    User.findOne({ email: email})
    .then(user=>{
        res.render('profile',{user})
    })

})


module.exports = router;