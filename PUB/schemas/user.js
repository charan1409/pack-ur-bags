const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    id:String,
    name:String,
    username:String,
    phone:String,
    email:String,
    gender:String,
    image:String,
    role:String,
    profileComplete:String,
    password:String
});
const User=mongoose.model('User',UserSchema);
module.exports=User;