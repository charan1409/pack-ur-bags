const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    id:{
        type:String
    },
    email:{
        type:String
    },
    from:{
        type:String,
        // required:true
    },
    to:{
        type:String,
        // required:true
    },
    adults:{
        type:String,
        // required:true
    },
    children:{
        type:String,
        // required:true
    },
    fromdate:{
        type:String
    },
    todate:{
        type:String
    }
});
const book=mongoose.model('book',bookSchema);
module.exports=book;