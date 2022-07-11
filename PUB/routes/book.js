const express = require('express');
const router = express.Router();
const cookieparser = require('cookie-parser');
router.use(cookieparser());

const book = require('../schemas/book');
const User = require('../schemas/user');
const verifier = require('../routes/verifier');


// router.get('/views/book/book',verifier, (req, res) => res.render('book'));
router.get('/book', verifier,(req,res)=>{
    const email = req.user.id;
    User.findOne({ email: email})
    .then(user=>{
        res.render('book',{user})
    })

})
router.post('/book',verifier, (req, res) => {
    const email = req.user.id
    const from1  = req.body.from;
    const to1 = req.body.dest;
    const adult1  = req.body.adult;
    const child1 = req.body.child;
    const dated1 = req.body.date1;
    const dated2 = req.body.date2;
    const id = from1.slice(0,2) + to1.slice(0,2)
    let errors = [];
    const newBooking = new book({
        id:id,
        eamil:email,
        from: from1,
        to: to1,
        adults: adult1,
        children: child1,
        fromdate: dated1,
        todate: dated2
    });
    if ((Date.parse(dated2))<(Date.parse(dated1))){
        errors.push({msg:'Incorrect arrival date'})
        console.log('invalid date');
            User.findOne({ email: email})
            .then(user=>{
                res.render('book',{errors})
            })
    }else{
        //save user
        newBooking.save().then(book => {
                User.findOne({ email: email})
                .then(user=>{
                    res.render('index')
                })
        })
    }
})

module.exports = router;