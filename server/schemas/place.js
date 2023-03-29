const mongoose=require('mongoose')

const placeSchema=new mongoose.Schema({
    id:String,
    from:String,
    to:String,
    photo:String,
    price:Number,
    details:String,
    category:String,
    reviews:[
        {
            userDetails: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            rating: Number,
            review: String
        }
    ],
    availability:Boolean,
    buseType:String,
    days:String
});
const place=mongoose.model('place',placeSchema);
module.exports=place;