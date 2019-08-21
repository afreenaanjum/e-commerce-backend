const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderDate: {
        type: Date,
        default: Date.now()
    },
    orderNumber: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    cartItemId: {
        type: Schema.Types.ObjectId,
        ref: 'CartItem'
    }, addressId: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Order = mongoose.model('Order', orderSchema)

module.exports = {
    Order
}