const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Pay = require('../schemas/payment');
const User = require('../schemas/user');
const Place = require('../schemas/place');
const Book = require('../schemas/book');


router.get('/views/payment', (req, res) => res.render('payment'));
router.get('/pay/:id',(req,res)=>{
    let bookid = req.params.id
    Book.findOne({ id: bookid})
    .then(book=>{
        var numberOfpassengers1 = book.numberOfpassengers
        console.log(book.numberOfpassengers)
        Place.findOne({ id: book.placeid}).then(place=>{
            const det={
                from:place.from,
                to:place.to,
                price:place.price,
                numberOfpassengers: numberOfpassengers1
            }
            console.log(det)
            res.status(200).json(det)
        })
    })

})
router.post('/pay/:id',(req, res) => {
    let username = req.params.id
    const num  = req.body.number;
    const hold = req.body.holder;
    const mon = req.body.expmon;
    const year = req.body.expyear;
    const cvv = req.body.cvv
    const newpe = new Pay({
        number : num,
        name: hold,
        expmonth: mon,
        expyear: year,
        cvv: cvv        
    });
   
        //save user
        newpe.save().then(pay => {
            // router.get('/book/:id',(req,res)=>{
                // const username = req.params.id
                User.findOne({ username: username})
                .then(user=>{
                    res.render('index',{user})
                })
            
            // })
            // console.log(book);
            // res.redirect('/');
        })
    
})

module.exports = router;