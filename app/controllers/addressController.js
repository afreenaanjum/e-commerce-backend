const { Address } = require('../models/address')

module.exports.list = (req, res) => {
    Address.find({ userId: req.user._id })
        .then(address => {
            if (address) {
                res.json(address)
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
    Address.findOne({ userId: req.user._id, _id: id })
        .then(address => {
            if (address) {
                res.json(address)
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
    const address = new Address(data) //Obj-constuctor function 
    address.userId = req.user._id
    address.save() // It will post data to MongoDB
        .then((address) => {
            res.json({ notice: 'successfully created a address', address })// it takes only one argument
        })
}



module.exports.update = (req, res) => {
    const id = req.params.id
    const data = req.body

    Address.findOne({ userId: req.user._id, _id: id })
        .then(address => {
            if (address) {
                const body = { ...data, address }
                Address.findOneAndUpdate({ userId: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
                    .then(address => {
                        if (address) {
                            res.json(address)
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
    Address.findOneAndDelete({ userId: req.user._id, _id: id })
        .then(address => {
            if (address) {
                res.json(address)
            } else {
                res.status('404').json({})
            }
        })
        .catch((err) => {
            res.status('404').json({})
        })
}


