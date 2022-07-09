const mongoose=require('mongoose')

const placeSchema=new mongoose.Schema({
    id:{
        type:String,
        // required:true
    },
    to:{
        type:String,
        // required:true
    },
    photo:{
        type:String,
        // required:true
    },
    details:{
        type:String,
        // required:true
    },
    category:{
        type:String,
        // required:true
    },
    rating:{
        type:String,
        // required:true
    },
    reviews:{
        type:String,
        // required:true
    },
    availability: {
        type:String,
    }
});
const place=mongoose.model('place',placeSchema);
module.exports=place; 