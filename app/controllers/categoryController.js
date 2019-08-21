const { Category } = require('../models/category')

module.exports.list = (req, res) => {
    console.log(req.user)
    Category.find()
        .then(categories => {
            if (categories) {
                res.json(categories)
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
    console.log(id)
    Category.findOne({ _id: id })
        .then(category => {
            if (category) {
                res.json(category)
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
    const category = new Category(data) //Obj-constuctor function 
    // category.userId = req.user._id
    // console.log(category)
    category.save() // It will post data to MongoDB
        .then((category) => {
            res.json({ notice: 'successfully created a category', category })// it takes only one argument
        })
}



module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Category.findOneAndUpdate({ _id: id }, { $set: body }, { new: true, runValidators: true })
        .then(category => {
            if (category) {
                res.json(category)
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
    Category.findOneAndDelete({ _id: id })
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


