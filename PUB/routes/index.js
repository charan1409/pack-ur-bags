const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../schemas/user');
router.get('/index/:id',(req,res)=>{
    const email = req.params.id
    User.findOne({ email: email})
    .then(user=>{
        res.render('index',{user})
    })

})


module.exports = router;