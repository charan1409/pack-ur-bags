const mongoose=require('mongoose');

const hotelSchema=new mongoose.Schema({
    placeid:{
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
const hotel=mongoose.model('hotel',hotelSchema);
module.exports=hotel;