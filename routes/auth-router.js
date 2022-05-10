const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// define the home page route
router.get('/login', (req, res) => {
    res.send('login home page')
})

// define the home page route
router.post('/register', (req, res) => {
    res.send('Birds home page')
})

// define the about route
router.get('/logout', (req, res) => {
    res.send('About birds')
})

module.exports = router