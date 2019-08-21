const { Product } = require('../models/product')

module.exports.list = (req, res) => {
    Product.find({ userId: req.user._id })
        .then(products => {
            if (products) {
                res.json(products)
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
    Product.findOne({ userId: req.user._id, _id: id })
        .then(product => {
            if (product) {
                res.json(product)
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
    const product = new Product(data) //Obj-constuctor function 
    product.userId = req.user._id
    product.save() // It will post data to MongoDB
        .then((product) => {
            res.json({ notice: 'successfully created a product', product })// it takes only one argument
        })
}



module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Product.findOneAndUpdate({ userId: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
        .then(product => {
            if (product) {
                res.json(product)
            } else {
                res.status('404').json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

//Deleting

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Product.findOneAndDelete({ userId: req.user._id, _id: id })
        .then(product => {
            if (product) {
                res.json(product)
            } else {
                res.status('404').json({})
            }
        })
        .catch((err) => {
            res.status('404').json({})
        })
}


