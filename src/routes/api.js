const express = require('express')
const path = require('path')

const router = express.Router()

const controller = require('../app/Http/Controllers/index');

// router.route('/').get(controller.userCtrl.login).post(controller.userCtrl.login)
router.route('/user/:id').get(controller.userCtrl.readUser).put(controller.userCtrl.readUser)
router.route('/users').get(controller.userCtrl.readAllUsers)

module.exports = router