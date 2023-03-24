const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    id:String,
    placeid:String,
    username:String,
    fromdate:String,
    todate:String,
    paymentDone: Boolean,
    numberOfpassengers: Number,
    passengers: Array,
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Places',
        select: 'from to price'
    }
});
const book=mongoose.model('book',bookSchema);
module.exports=book;