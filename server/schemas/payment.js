const mongoose = require('mongoose');

const payscheme = new mongoose.Schema({
    number:{
        type:String
    },
    name:{
        type:String
    },
    expmonth:{
        type:String
    },
    expyear:{
        type:String
    },
    cvv:{
        type:String
    }

})
const payment=mongoose.model('payment', payscheme);
module.exports=payment;