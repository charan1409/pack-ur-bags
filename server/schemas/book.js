const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    id:String,
    username:String,
    fromdate:String,
    todate:String,
    paymentDone: Boolean,
    numberOfpassengers: Number,
    passengers: Array,
    placedetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'place'
    },
    paymentDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment'
    },
    feedbackGiven: Boolean
});
const book=mongoose.model('book',bookSchema);
module.exports=book;