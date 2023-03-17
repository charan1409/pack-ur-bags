const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    placeid: String,
    username: String,
    name: String,
    gender: String,
    age: String
})
const review = mongoose.model('review',reviewSchema);
module.exports = review;