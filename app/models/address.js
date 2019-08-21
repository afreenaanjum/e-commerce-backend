const mongoose = require('mongoose')

const Schema = mongoose.Schema

const addressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    addressType: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Address = mongoose.model('Address', addressSchema)

module.exports = {
    Address
}