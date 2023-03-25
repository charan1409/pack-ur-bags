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
    const placeid = req.params.id;
    Place.findOne({ id: placeid})
    .then(place=>{
        if(place) res.status(200).json({stat:"fine"})
        else res.status(401).json({stat:"fine"})
    })
})

router.post('/book/:id',async (req,res)=>{
    const id=Date.now()+""+Math.floor(Math.random()*10);
    const placeid=req.params.id;
    const username=req.body.username;
    const fromdate=req.body.fromdate;
    const todate=req.body.todate;
    const paymentDone=req.body.paymentDone;
    const numberOfpassengers=req.body.numberOfpassengers;
    const passengers=req.body.passengers;
    const place = await Place.findOne({ id: placeid });
    const newBooking=new book({
        id:id,
        username:username,
        fromdate:fromdate,
        todate:todate,
        paymentDone:paymentDone,
        numberOfpassengers:numberOfpassengers,
        passengers:passengers,
        placedetails:place
    });
    newBooking.save().then(book=>{
        res.status(200).json(id)
    })
})

module.exports = router;