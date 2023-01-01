const mongoose=require('mongoose')

const placeSchema=new mongoose.Schema({
    id:String,
    from:String,
    to:String,
    photo:String,
    price:Number,
    details:String,
    category:String,
    rating:String,
    reviews:Array,
    availability:Boolean,
    buseType:String,
    days:String
});
const place=mongoose.model('place',placeSchema);
module.exports=place;