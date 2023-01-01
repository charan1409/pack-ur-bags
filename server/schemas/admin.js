const mongoose=require('mongoose');

const AdminSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    user:{
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
    password:{
        type:String,
        // required:true
    }
});
const Admin=mongoose.model('Admin',AdminSchema);
module.exports=Admin;