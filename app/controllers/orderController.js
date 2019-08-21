const { Order } = require('../models/order')
// const { CartItem } = require('../models/cartItem')
module.exports.list = (req, res) => {
    Order.find({ userId: req.user._id }).populate('CartItem').populate('Address')
        .then(orders => {
            if (orders) {
                res.json(orders)
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
    Order.findOne({ userId: req.user._id, _id: id }).populate('CartItem').populate('Address')
        .then(order => {
            if (order) {
                res.json(order)
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
    const order = new Order(data) //Obj-constuctor function 
    order.userId = req.user._id
    order.save() // It will post data to MongoDB
        .then((order) => {
            res.json({ notice: 'successfully created a order', order })// it takes only one argument
        })
}



module.exports.update = (req, res) => {
    const id = req.params.id
    const data = req.body

    Order.findOne({ userId: req.user._id, _id: id }).populate('CartItem').populate('Address')
        .then(order => {
            if (order) {
                const body = { ...data, order }
                Order.findOneAndUpdate({ userId: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
                    .then(order => {
                        if (order) {
                            res.json(order)
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
    Order.findOneAndDelete({ userId: req.user._id, _id: id }).populate('CartItem').populate('Address')
        .then(category => {
            if (category) {
                res.json(category)
            } else {
                res.status('404').json({})
            }
        })
        .catch((err) => {
            res.status('404').json({})
        })
}


