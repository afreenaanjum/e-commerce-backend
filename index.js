const express = require('express')
const mongoose = require('./config/database')
const router = require('./config/routes')
const path = require('path')


const app = express()
const port = process.env.PORT || 3005


app.use(express.json())

app.use(express.static(path.join(__dirname, "client/build")))
app.use('/', router)


app.listen(port, () => {
    console.log('Listening to port', port)
})

