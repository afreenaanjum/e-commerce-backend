const mongoose = require('mongoose')// npm install mongoose

//db configuration
mongoose.Promise = global.Promise // we are telling mongoose to use ES6 promise library
// We are passing url because this might be present in another place or country and to get access that
//options are always passed as second arg
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb+srv://anjumafreena:Copycat:P12@e-commerce-iqqqj.mongodb.net/test?retryWrites=true&w=majority', { userNewUrlParser: true })
    .then(() => {
        console.log("Connected to db of e-commerce")
    })
    .catch((err) => {
        console.log('Error connectong to the db', err)
    })

module.exports = mongoose