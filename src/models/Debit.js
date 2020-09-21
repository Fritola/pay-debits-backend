const mongoose = require('mongoose')

const debitsSchema = new mongoose.Schema({
    userID: String,
    value: Number,
    rest: Number,
    name: String,
    debitEmail: String,
    type: String,
    parcel: Number,
    restParcel: Number,
    who: String,
    status: Boolean
})

module.exports = mongoose.model('Debits', debitsSchema)