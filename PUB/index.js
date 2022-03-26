// Imports
const express = require("express");
const app = express();
const port = 3000

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')


app.get("/", function(req, res){
    res.render('index');
});

app.get("/login", function(req, res){
    res.render('login');
});

app.get("/beach", function(req, res){
    res.render('beach');
});

app.get("/book", function(req, res){
    res.render('book');
});

app.get("/countryside", function(req, res){
    res.render('countryside');
});

app.get("/cultural", function(req, res){
    res.render('cultural');
});

app.get("/desert", function(req, res){
    res.render('desert');
});

app.get("/forest", function(req, res){
    res.render('forest');
});

app.get("/hillstation", function(req, res){
    res.render('hillstation');
});

app.get("/island", function(req, res){
    res.render('island');
});

app.get("/winter", function(req, res){
    res.render('winter');
});


app.get("/review", function(req, res){
    res.render('review');
});

app.get("/package", function(req, res){
    res.render('package');
});

app.get("/profile", function(req, res){
    res.render('profile');
});

app.get("/services", function(req, res){
    res.render('services');
});


app.post("/login", function(req, res){

    var inemail = (req.body.inemail);
    var inpass = (req.body.inpass);
    var upname = (req.body.upname);
    var upemail = (req.body.upemail);
    var uppass1 = (req.body.uppass1);
    var uppass2 = (req.body.uppass2);


    res.write("Your Email is : "+ inemail + "\n");
    res.write("Your Password is : "+ inpass + "\n");
    res.write("Your Name:  "+ upname + "\n");
    res.write("Your Email is : "+ upemail + "\n");
    res.write("Your pass1: "+ uppass1 + "\n");
    res.write("Your pass2: "+ uppass2 + "\n");

    res.end();
})

app.listen(port, function(){
    console.log("server is runnig on the port 3000");
});