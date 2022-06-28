const mongoose=require('mongoose');
const hot = require('../schemas/hotel');

const placeSchema=new mongoose.Schema({
    id:{
        type:String,
        // required:true
    },
    from:{
        type:String,
        // required:true
    },
    to:{
        type:String,
        // required:true
    },
    details:{
        type:String,
        // required:true
    },
    rating:{
        type:String,
        // required:true
    },
    price: {
        type:String,
    },
    availability: {
        type:String,
    }
});
const place=mongoose.model('place',placeSchema);
module.exports=place; 