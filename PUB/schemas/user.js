const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    username:{
        type:String,
        // required:true
    },
    phone:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    gender:String,
    image:String,
    profileComplete:String,
    websiteReview:String,
    websiteReviewId:String,
    tourReview:{
        type:Array
    },
    password:{
        type:String,
        // required:true
    }
});
const User=mongoose.model('User',UserSchema);
module.exports=User;