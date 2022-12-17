require('dotenv').config();

const api = require('./src/routes/api')
const web = require('./src/routes/web')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/resources/views'));
app.use('/images', express.static(__dirname + './src/resources/images'));
// app.use(express.static(__dirname + '/public'));
app.use(express.static('./src/public'));
// app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

app.use('/', web)
app.use('/api', api)

app.listen(process.env.NODE_PORT, () => {
    console.log(`Application ${process.env.NODE_NAME} => START on Port ${process.env.NODE_PORT}`)
})


