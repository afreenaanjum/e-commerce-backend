const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartItemSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
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

const CartItem = mongoose.model('CartItem', cartItemSchema)

module.exports = {
    CartItem
}