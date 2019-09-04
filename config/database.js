const mongoose = require('mongoose')

//db configuration
mongoose.Promise = global.Promise 
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/e-commerce', { userNewUrlParser: true })
    .then(() => {
        console.log("Connected to db of e-commerce")
    })
    .catch((err) => {
        console.log('Error connectong to the db', err)
    })

module.exports = mongoose