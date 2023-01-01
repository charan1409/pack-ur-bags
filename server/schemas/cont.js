const mongoose=require('mongoose');

const contSchema=new mongoose.Schema({
    firstname:{
        type:String,
        // required:true
    },
    lastname:{
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
    add:{
        type:String,
    }
});
const cont=mongoose.model('cont',contSchema);
module.exports=cont;