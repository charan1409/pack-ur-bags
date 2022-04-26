const mongoose=require('mongoose');

const fdbSchema=new mongoose.Schema({
    email:{
        type:String,
        // required:true
    },
    detail:{
        type:String,
        // required:true
    }
});
const fdb=mongoose.model('fdb',fdbSchema);
module.exports=fdb;