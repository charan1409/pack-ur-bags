const mongoose=require('mongoose')
const Float = require('mongoose-float').loadType(mongoose, 2);

const placeSchema=new mongoose.Schema({
    id:String,
    from:String,
    to:String,
    photo:String,
    price:Number,
    details:String,
    category:String,
    rating: {
        type: Float,
        default: 0
    },
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