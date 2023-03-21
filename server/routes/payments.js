const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Pay = require('../schemas/payment');
const User = require('../schemas/user');
const Place = require('../schemas/place');
const Book = require('../schemas/book');


router.get('/views/payment', (req, res) => res.render('payment'));
router.get('/pay/:id', (req, res) => {
    let bookid = req.params.id
    Book.findOne({ id: bookid })
        .then(book => {
            var numberOfpassengers1 = book.numberOfpassengers
            console.log(book.numberOfpassengers)
            Place.findOne({ id: book.placeid }).then(place => {
                const det = {
                    from: place.from,
                    to: place.to,
                    price: place.price,
                    numberOfpassengers: numberOfpassengers1
                }
                console.log(det)
                res.status(200).json(det)
            })
        })
})
<<<<<<< HEAD

router.get('/mybookings/:id', async (req, res) => {
    let username = req.params.id;

    try {
        const bookings = await Book.find({ username: username });
        const tours = [];
        for (let i = 0; i < bookings.length; i++) {
            const place = await Place.findOne({ id: bookings[i].placeid });
            const det = {
                from: place.from,
                to: place.to,
                price: place.price,
                numberOfpassengers: bookings[i].numberOfpassengers,
                fromdate: bookings[i].fromdate,
                todate: bookings[i].todate
            };
            tours.push(det);
        }
        res.status(200).json(tours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/pay/:id', (req, res) => {
    let username = req.params.id
    const num = req.body.number;
=======
router.post('/pay/:id',(req, res) => {
    const bookid = req.params.id;
    let username = req.body.username;
    const num  = req.body.number;
>>>>>>> 9903b4623d55c5db9347f18a4a24fec668307a59
    const hold = req.body.holder;
    const mon = req.body.expmon;
    const year = req.body.expyear;
    const cvv = req.body.cvv

    const newpe = new Pay({
        number: num,
        name: hold,
        expmonth: mon,
        expyear: year,
<<<<<<< HEAD
        cvv: cvv
    });

    //save user
    newpe.save().then(pay => {
        // router.get('/book/:id',(req,res)=>{
        // const username = req.params.id
        User.findOne({ username: username })
            .then(user => {
                res.render('index', { user })
            })

        // })
        // console.log(book);
        // res.redirect('/');
    })

=======
        cvv: cvv,
        name: username,
        bookid: bookid,
        timestamp: new Date()        
    });
        //save user
        newpe.save().then(pay => {
            Book.findOneAndUpdate({ id: bookid},{paymentDone: true}).then(book=>{
                res.status(200).json({msg: 'Payment Successful'});
            })
        })
    
>>>>>>> 9903b4623d55c5db9347f18a4a24fec668307a59
})

router.get('/getTransactions/:id', (req, res) => {
    let username = req.params.id;
    User.findOne({ username: username }).then(user => {
        Pay.find({ name: username }).then(pay => {
            res.status(200).json(pay);
        })
    })
})

module.exports = router;