require('dotenv').config();

const express = require('express')

const app = express()
const cors = require('cors')
const compression = require('compression')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const api = require('./src/routes/api')
const web = require('./src/routes/web');

let corsOptions = {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 200,
    credentials: true,
    maxAge: 3600
}
app.use(cors(corsOptions))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/resources/views'));
app.use('/images', express.static(__dirname + './src/resources/images'));
app.use(express.static('./src/public'));
// app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Compress Environment Apps JS / CSS
app.use(compression());

// Add Logger Acceess
// app.use(logger());

app.use('/api', api)
app.use('/', web)

app.use((error, req, res, next) => {
    const { statusCode, message, errors } = error
    res.status(statusCode || 500).json({
        status: false,
        message: message,
        errors
    })
})

app.listen(process.env.NODE_PORT, () => {
    console.log(`Application ${process.env.NODE_NAME} => START on Port ${process.env.NODE_PORT}`)
})


