const express = require('express')
const path = require('path')

const router = express.Router()

const controller = require('../app/Http/Controllers/index');
const auth = require('../app/Http/Controllers/Auth/authentication');

router.route('/login').get(auth.index);
router.route('/user/:id').get(controller.userCtrl.readAllUsers).put(controller.userCtrl.readUser)

module.exports = router