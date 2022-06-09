const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const book = require('../schemas/book');
const User = require('../schemas/user');
let username = null;

router.get('/views/book/book', (req, res) => res.render('book'));
router.get('/book/:id',(req,res)=>{
    username = req.params.id
    User.findOne({ username: username})
    .then(user=>{
        res.render('book',{user})
    })

})
router.post('/book/:id',(req, res) => {
    username = req.params.id
    const from1  = req.body.from;
    const to1 = req.body.dest;
    const adult1  = req.body.adult;
    const child1 = req.body.child;
    const dated1 = req.body.date1;
    const dated2 = req.body.date2;
    let errors = [];
    const newcon = new book({
        username:username,
        from: from1,
        to: to1,
        adults: adult1,
        children: child1,
        fromdate: dated1,
        todate: dated2
    });
    if ((Date.parse(dated2))<(Date.parse(dated1))){
        errors.push({msg:'Please select correct Arrival date'})
        console.log('invalid date');
            User.findOne({ username: username})
            .then(user=>{
                res.render('book',{user,errors})
            })
    }else{
        //save user
        newcon.save().then(book => {
                User.findOne({ username: username})
                .then(user=>{
                    res.render('payment',{user})
                })
        })
    }
})

module.exports = router;