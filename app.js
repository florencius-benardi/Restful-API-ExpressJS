const express = require('express')
const userRouter = require('./routes/user-router')
const authRouter = require('./routes/auth-router')
require('dotenv').config();

const app = express()

// app.get('/', async (req, res) => {
//     // const rows = await process.postgresql.query('SELECT * FROM books');
//     // console.log(rows);
//     res.send('ok')
// })

app.use('/', userRouter)
app.use('/', authRouter)

app.listen(process.env.NODE_PORT, () => {
    console.log(`Application ${process.env.NODE_NAME} => START on Port ${process.env.NODE_PORT}`)
})

