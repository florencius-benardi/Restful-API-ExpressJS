const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./database/models/index')

const userRoutes = require('./routes/user-router')
const authRoutes = require('./routes/auth-router')
require('dotenv').config();

const app = express()

// app.get('/', async (req, res) => {
//     // const rows = await process.postgresql.query('SELECT * FROM books');
//     // console.log(rows);
//     res.send('ok')
// })

app.use('/', userRoutes)
app.use('/', authRoutes)

app.listen(process.env.NODE_PORT, () => {
    sequelize.authenticate().then(function (errors) { console.log(errors) });
    // console.log(`Application ${process.env.NODE_NAME} => START on Port ${process.env.NODE_PORT}`)
})


