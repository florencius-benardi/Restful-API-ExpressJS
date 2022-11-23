const api = require('./src/routes/api')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

require('dotenv').config();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', api)

app.listen(process.env.NODE_PORT, () => {
    console.log(`Application ${process.env.NODE_NAME} => START on Port ${process.env.NODE_PORT}`)
})


