const express = require('express');
const router = express.Router();
const cookieparser = require('cookie-parser');
router.use(cookieparser());

const book = require('../schemas/book');
const User = require('../schemas/user');
const Place = require('../schemas/place');
const verifier = require('../routes/verifier');

router.get('/booking/:id',(req,res)=>{
    const placeid = req.params.id;
    Place.findOne({ id: placeid})
    .then(place=>{
        if(place) res.status(200).json({stat:"fine"})
        else res.status(400).json({stat:"fine"})
    })
})
router.get('/book/:id', (req, res) => {
    const placeid = req.params.id
    // const from1  = req.body.from;
    // const to1 = req.body.dest;
    // const adult1  = req.body.adult;
    // const child1 = req.body.child;
    // const dated1 = req.body.date1;
    // const dated2 = req.body.date2;
    // const id = from1.slice(0,2) + to1.slice(0,2)
    // let errors = [];
    // const newBooking = new book({
    //     id:id,
    //     eamil:email,
    //     from: from1,
    //     to: to1,
    //     adults: adult1,
    //     children: child1,
    //     fromdate: dated1,
    //     todate: dated2
    // });
    // if ((Date.parse(dated2))<(Date.parse(dated1))){
    //     errors.push({msg:'Incorrect arrival date'})
    //     console.log('invalid date');
    //         User.findOne({ email: email})
    //         .then(user=>{
    //             res.render('book',{errors})
    //         })
    // }else{
    //     //save user
    //     newBooking.save().then(book => {
    //             User.findOne({ email: email})
    //             .then(user=>{
    //                 res.render('index',{user})
    //             })
    //     })
    // }
    Place.findOne({ id: placeid})
    .then(place=>{
        if(place) res.status(200).json({stat:"fine"})
        else res.status(401).json({stat:"fine"})
    })
})

router.post('/book/:id',(req,res)=>{
    const id=Date.now()+""+Math.floor(Math.random()*10);
    const placeid=req.params.id;
    const username=req.body.username;
    const fromdate=req.body.fromdate;
    const todate=req.body.todate;
    const paymentDone=req.body.paymentDone;
    const numberOfpassengers=req.body.numberOfpassengers;
    const passengers=req.body.passengers;
    const newBooking=new book({
        id:id,
        placeid:placeid,
        username:username,
        fromdate:fromdate,
        todate:todate,
        paymentDone:paymentDone,
        numberOfpassengers:numberOfpassengers,
        passengers:passengers
    });
    newBooking.save().then(book=>{
        res.status(200).json(id)
    })
})

module.exports = router;