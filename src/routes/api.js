const express = require('express')
const path = require('path')

const router = express.Router()

const controller = require('../app/Http/Controllers/index');

router.route('/user').get(controller.userCtrl.readAllUsers).post(controller.userCtrl.readUser)
router.route('/user/:id').get(controller.userCtrl.readAllUsers).put(controller.userCtrl.readUser)

responseJson()
router.get('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(404).end()
})

module.exports = router