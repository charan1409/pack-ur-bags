const mongoose=require('mongoose');

const contSchema=new mongoose.Schema({
    fname:{
        type:String,
        // required:true
    },
    lname:{
        type:String,
        // required:true
    },
    mail:{
        type:String,
        // required:true
    },
    msg:{
        type:String,
    },
    adddet:{
        type:String,
        // required:true
    }
});
const cont=mongoose.model('cont',contSchema);
module.exports=cont;