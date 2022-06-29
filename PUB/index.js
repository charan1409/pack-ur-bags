const express = require("express");
const app = express();
const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = 3000

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//connect to mongo
mongoose.connect(process.env.MONGODB_LINK,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
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