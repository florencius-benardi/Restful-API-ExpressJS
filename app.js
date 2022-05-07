const express = require('express')
require('dotenv').config();

const app = express()

app.get('/', async (req, res) => {
    // const rows = await process.postgresql.query('SELECT * FROM books');
    // console.log(rows);
    res.send('ok')
})

app.listen(process.env.NODE_PORT, () => {
    console.log('1')
})

