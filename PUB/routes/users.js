const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../schemas/user');

//login Page
router.get('/login', (req, res) => res.render('login'));

//register Page
router.get('/register', (req, res) => res.render('/register'));

//  login handle
router.post('/login', (req, res) => {
    const inemail = req.body.inemail;
    const inpassword = req.body.inpass
    let errors = [];
    User.findOne({ email: req.body.inemail })

        .then(user => {
            if (!user) {
                errors.push({ msg: 'email is not registerd' });
                res.render('login', { errors });

            }
            console.log(user);
            //Match Password
            if (inpassword === user.password) {
                res.redirect('/');
            } else {
                errors.push({ msg: 'Incorrect password or email' });
                res.render('login', { errors })
            }
        })
        .catch(err => console.log(err));
})

//register handle
router.post('/register', (req, res) => {
    const inname = req.body.upname;
    const inemail = req.body.upemail;
    const inpass1 = req.body.uppass1;
    const inpass2 = req.body.uppass2
    let errors = [];
    //check required fields
    if (!inname || !inemail || !inpass1 || !inpass2) {
        errors.push({ msg: 'please fill in all fields' });
        res.render('login', { errors })
    }

    //check password match
    if (inpass1 !== inpass2) {
        errors.push({ msg: 'Password do not match' });
        res.render('login', { errors })
    }
    //check pass length
    if (inpass1.length < 6) {
        errors.push({ msg: 'Password should be atleast 6 charcaters' });
        res.render('login', { errors })
    }
    User.findOne({ email: inemail })
        .then(user => {
            if (user) {
                //User exists
                console.log(user.email);
                errors.push('Email is already registered');
                res.render('register', { errors });
            } else {
                console.log(inname);
                const newUser = new User({
                    name: inname,
                    email: inemail,
                    password: inpass1
                });
                //save user
                newUser.save().then(user => {
                    console.log(newUser);
                    res.redirect('/login');
                })
                    .catch(err => console.log(err));
                //  //hash password
                // bcrypt.genSalt(10,(err,salt)=>
                // bcrypt.hash(newUser.password,salt,(err,hash)=>{
                // if(err) throw err;
                //  // Set password to hashed
                // newUser.password=hash;
                // //save user
                // newUser.save().then(user=>{
                //     req.flash('success_msg','you are now registered and can log in');
                //     res.redirect('/users/login');
                // })
                // .catch(err=>console.log(err));
                // }))
            }
        });


});


//password reset
// router.get('/forgotpassword', function (req, res) {
//   res.render('forgotpassword.ejs');
// });

//pasword forget

// router.post('/passwordreset',function(req,res){
//     res.render('ResetPassword');
//     if(req.body.email!==undefined){
//         var emailAddress=req.body.email;
//         User.findOne({email:emailAddress})
//         .then(user=>{
//             if(user){
//             //User exists

//             var payload={
//                 id:user.id,
//                 email:user.email

//         };
//        var secret=user.password+'-'+'1506868106675';
//        console.log(secret);
//        var token=jwt.encode(payload,secret);

//        var mailOptions = {
//   from: 'your email address',
//   to: `${payload.email}`,
//   subject: ' reset link',
//   html:'<a href="https://login-validation.herokuapp.com/users/resetpassword/' + payload.id + '/' + token + '">Reset password</a>'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// })

// }
//         })
//     }
//         else{
//             res.send('email adress is missing');
//         }
// });

// router.get('/resetpassword/:id/:token', function(req, res) {
//     // TODO: Fetch user from database using
//     //req.params.id
//     User.findOne({_id:req.params.id})
//     .then(user=>{
//         if(user){

//             var secret = user.password + '-' + '1506868106675';
//             var payload = jwt.decode(req.params.token, secret);

//             res.send('<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">'+
//            '<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>'+
//            ' <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script><style>body{background-image: url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg")}'+
//             'body{background-size: cover;}'+
//             'body{background-repeat: no-repeat;}'+
//             'body{height: 100%;}'+
//             'body{font-family:"Numans"  sans-serif;}.container{height: 100%;align-content: center;}'+
//             '.card{ height: 120px;margin-top: auto;margin-bottom: auto;width: 400px; background-color: rgba(0,0,0,0.5) !important; }'+
//             '.login_btn{color: black;background-color: #FFC312;width: 130px;}'+
//             'input:focus{outline: 0 0 0 0  !important;box-shadow: 0 0 0 0 !important; }'+
//                 '</style><html><body><div class="container">'+
//                ' <div class="d-flex justify-content-center h-100">'+
//                     '<div class="card">'+
//                         '<div class="card-body"><form action="/users/resetpassword" method="POST">' +
//         '<input type="hidden"class="form-control" name="id" value="' + payload.id + '" />' +
//         '<input type="hidden"class="form-control" name="token" value="' + req.params.token + '" />' +
//         '<div class="form-group"><input type="password"class="form-control" name="password" value="" placeholder="Enter your new password..." /></div>' +
//         '<div class="form-group"><input type="submit"class="btn float-right login_btn" value="Reset Password" />' +
//     '</div></div></div></div></form></body></html>');


//         }
//     })

// });


// router.post('/resetpassword', function(req, res) {
//     User.findOneAndUpdate({_id:req.body.id},{$set:{password:`${req.body.password}`}},{new:true}).then(user=>{
//         bcrypt.genSalt(10, function(err, salt) {
//             bcrypt.hash(user.password, salt, function(err, hash) {
//               user.password = hash;

//               user.save().then(user=>{
//                 req.flash('success_msg','Password has been reset Successfully');
//                 res.redirect('/users/login');
//               });

//     })
// })
// })


//           //req.params.id


// })

//login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Handle
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logout');
    res.redirect('/users/login');
});



module.exports = router;