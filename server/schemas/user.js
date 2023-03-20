const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    id:String,
    name:String,
    username:String,
    phonenumber:String,
    email:String,
    gender:String,
    image:String,
    role:String,
    imagegiven:Boolean,
    feedbackgiven:Boolean,
    password:String,
    registered:Boolean,
    OTP:String,
    OTPTime:Date,
});
const User=mongoose.model('User',UserSchema);
module.exports=User;