const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const book = require('../schemas/book');
const User = require('../schemas/user');
let email = null;

router.get('/views/book/book', (req, res) => res.render('book'));
router.get('/book/:id',(req,res)=>{
    email = req.params.id
    User.findOne({ email: email})
    .then(user=>{
        res.render('book',{user})
    })

})
router.post('/book',(req, res) => {
    const from1  = req.body.from;
    const to1 = req.body.dest;
    const adult1  = req.body.adult;
    const child1 = req.body.child;
    const dated1 = req.body.date1;
    const dated2 = req.body.date2;
    let errors = [];
    const newcon = new book({
        mail:email,
        from: from1,
        to: to1,
        adults: adult1,
        children: child1,
        fromdate: dated1,
        todate: dated2
    });
    if ((Date.parse(dated2))<(Date.parse(dated1))){
        errors.push({msg:'Please select correct Arrival date'})
        // router.get('/book/:id',(req,res)=>{
        console.log('invalid date');
            // const email = req.params.id
            User.findOne({ email: email})
            .then(user=>{
                res.render('book',{user,errors})
            })
        // res.render('book',{errors})
    }else{
        //save user
        newcon.save().then(book => {
            // router.get('/book/:id',(req,res)=>{
                // const email = req.params.id
                User.findOne({ email: email})
                .then(user=>{
                    res.render('payment',{user})
                })
            
            // })
            // console.log(book);
            // res.redirect('/');
        })
    }
})

module.exports = router;