const express = require("express");
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

app.get("/", function (req, res) {
    res.render('landing');
});

app.get("/login", function (req, res) {
    res.render('login');
});

app.get("/register", function (req, res) {
    res.render('register');
});

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
app.use('/adminprofile',require('./routes/adminprofile'));