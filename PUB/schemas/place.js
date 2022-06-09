const mongoose=require('mongoose');
const hot = require('../schemas/hotel');

const placeSchema=new mongoose.Schema({
    place:{
        type:String,
        // required:true
    },
    about:{
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
    hotels:[{
        type:Schema.Types.ObjectId, ref: 'hot'
    }],
    availability: {
        type:String,
    }
});
const plc=mongoose.model('plc',placeSchema);
module.exports=plc; 