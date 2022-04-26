const express = require("express");
// const session=require('express-session');
// const flash=require('connect-flash');
const app = express();
const mongoose=require('mongoose');
const port = 3000

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//connect to mongo
mongoose.connect('mongodb+srv://fsdgrp17:fsdproject@grp17.5urlr.mongodb.net/grp17?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>console.log('MongoDb  Connected...'))
.catch(err=>console.log(err));

// Static Files
app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'ejs')

//Express Session
// app.use(session({
//     secret:'secret',
//     resave:true,
//     saveUninitialized:true
// }));


app.get("/", function (req, res) {
    res.render('landing');
});

// app.get("/payment", function (req, res) {
//     res.render('payment');
// });

// app.get("/succesful", function (req, res) {
//     res.render('succesful');
// });

// app.get("/index", function (req, res) {
//     res.render('index');
// });

// app.get("/login", function (req, res) {
//     res.render('login');
// });

// app.get("/register", function (req, res) {
//     res.render('register');
// });

// app.get("/book", function(req, res){
//     res.render('book');
// })

// app.get("/profile", function(req, res){
//     res.render('profile');
// })

app.listen(port, function () {
    console.log("server is running on the port 3000");
});

//routes
app.use('/users',require('./routes/users'));
app.use('/profile',require('./routes/profile'));
app.use('/index',require('./routes/index'));
app.use('/places',require('./routes/places'));
app.use('/book',require('./routes/book'));
app.use('/admins',require('./routes/admins'));
app.use('/payment',require('./routes/payments'));
