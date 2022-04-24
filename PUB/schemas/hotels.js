const mongoose=require('mongoose');

const fdbSchema=new mongoose.Schema({
    place:{
        type:String,
        // required:true
    },
    hotel1:{
        type:String,
        // required:true
    },
    hotel2:{
        type:String,
        // required:true
    },
    hotel3: {
        type:String,
    }

});
const hschema=mongoose.model('hschema',fdbSchema);
module.exports=hschema;