const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const validator = require('validator')


//localhost:3000/users/register
module.exports.register = function (req, res) {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.send({ // This is done because even the encrypted password is not sent
                _id: user._id,
                username: user.username,
                email: user.email,
                mobile: user.mobile,
                address: user.address
            })
        })
        .catch((err) => {
            res.send(err)

        })
}

//localhost:3000/users/login

module.exports.login = function (req, res) {
    const body = req.body
    console.log('bdy', body)
    var isEmailOrMobile = ''
    if (validator.isEmail(body.value)) {
        isEmailOrMobile = "email"
    } else {
        isEmailOrMobile = "mobile"
    }

    User.findByCredentials(body.value, isEmailOrMobile, body.password)
        .then((user) => {
            return user.generateToken()
        })
        .then((token) => {
            res.send({
                token: token //token is string, so we are sending it as an object, because axios cant read it from x-auth headers field
            })
        })
        .catch((err) => {
            res.send(err)
        })
}


//localhost:3000/users/account 
module.exports.account = function (req, res) {
    const { user } = req
    res.send(user)
}


//localhost:3000/users/logout
module.exports.logout = function (req, res) {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(() => {
            res.send("Succesfully logged out")
        })
        .catch((err) => {
            res.send(err)
        })
}


