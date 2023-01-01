const mongoose=require('mongoose');

const fdbSchema=new mongoose.Schema({
    image:String,
    username:String,
    feedback:String,
});
const fdb=mongoose.model('feedback',fdbSchema);
module.exports=fdb;