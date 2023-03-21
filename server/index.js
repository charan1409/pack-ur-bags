const express = require("express");
const app = express();
const cookieparser = require('cookie-parser');
app.use(cookieparser());
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config();
const port = 9000

const bodyParser = require("body-parser");
app.use(express.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors());

//connect to mongo
mongoose.connect(process.env.MONGODB_LINK_ATLAS,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>console.log('MongoDb  Connected...'))
.catch(err=>console.log(err));

// Static Files
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port, function () {
    console.log("server is running on the port 9000");
});

//routes
app.use('/users',require('./routes/users'));
app.use('/profile',require('./routes/profile'));
app.use('/index',require('./routes/index'));
app.use('/places',require('./routes/places'));
app.use('/book',require('./routes/book'));
app.use('/admins',require('./routes/admins'));
app.use('/payment',require('./routes/payments'));