const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    placeid: String,
    username: String,
    userimage: String,
    review: String
})
const review = mongoose.model('review',reviewSchema);
module.exports = review;