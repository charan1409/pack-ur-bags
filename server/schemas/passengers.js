const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    placeid: String,
    username: String,
    name: String,
    gender: String,
    age: String
})
const passenger = mongoose.model('passenger',passengerSchema);
module.exports = passenger;