const { CartItem } = require('../models/cartItem')

module.exports.list = (req, res) => {
    CartItem.find({ userId: req.user._id })
        .then(cartItems => {
            if (cartItems) {
                res.json(cartItems)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    CartItem.findOne({ userId: req.user._id, _id: id })
        .then(cartItem => {
            if (cartItem) {
                res.json(cartItem)
            }
            else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    const data = req.body
    const cartItem = new CartItem(data) //Obj-constuctor function 
    cartItem.userId = req.user._id
    cartItem.save() // It will post data to MongoDB
        .then((cartItem) => {
            res.json({ notice: 'successfully created a cartItem', cartItem })// it takes only one argument
        })
}



module.exports.update = (req, res) => {
    const id = req.params.id
    const data = req.body

    CartItem.findOne({ userId: req.user._id, _id: id })
        .then(cartItem => {
            if (cartItem) {
                const body = { ...data, cartItem }
                CartItem.findOneAndUpdate({ userId: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
                    .then(cartItem => {
                        if (cartItem) {
                            res.json(cartItem)
                        } else {
                            res.status('404').json({})
                        }
                    })
                    .catch(err => {
                        res.json(err)
                    })
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

//Deleting

module.exports.destroy = (req, res) => {
    const id = req.params.id
    CartItem.findOneAndDelete({ userId: req.user._id, _id: id })
        .then(cartItem => {
            if (cartItem) {
                res.json(cartItem)
            } else {
                res.status('404').json({})
            }
        })
        .catch((err) => {
            res.status('404').json({})
        })
}


