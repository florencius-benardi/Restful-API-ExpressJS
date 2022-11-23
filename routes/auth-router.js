const express = require('express')
const path = require('path')

const router = express.Router()

const authController = require('../app/Http/Controllers/Auth/authentication');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// define the home page route
router.get('/login', authController.logIn)

// define the home page route
router.post('/register', (req, res) => {
    res.send('Birds home page')
})

// define the about route
router.get('/logout', (req, res) => {
    res.send('About birds')
})

module.exports = router