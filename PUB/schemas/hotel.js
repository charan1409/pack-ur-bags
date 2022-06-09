const mongoose=require('mongoose');

const fdbSchema=new mongoose.Schema({
    place:{
        type:String,
        // required:true
    },
    hotelid:{
        type:String,
        // required:true
    },
    hotelimg:{
        type:String,
        // required:true
    },
    hoteldet: {
        type:String,
    }

});
const hotel=mongoose.model('hotel',fdbSchema);
module.exports=hotel;