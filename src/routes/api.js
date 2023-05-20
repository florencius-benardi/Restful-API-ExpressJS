const express = require('express')
const multer = require('multer')

const router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/storages/temp')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage })

const {
  userController, authController, roleController, userRoleController,
} = require('../app/Http/Controllers/index')

const { validatedBearer } = require('../app/Http/Middleware/Authenticate')
const { validateBody, createRoleValidation,
  createUserValidation, loginValidation, readRoleValidation, readUserValidation, updateRoleModuleValidation,
  updateRoleValidation, updateUserValidation, userRoleValidation
} = require('../app/Http/Middleware/Rules/index')

router.route('/login').post(loginValidation, validateBody, authController.login)
router.route('/logout').post(validatedBearer, authController.logout)
router.route('/user').get(validatedBearer, userController.readAllUsers)
  .post(validatedBearer, createUserValidation, validateBody, userController.storeUser)
router.route('/user/options').get(validatedBearer, userController.optionUsers)
router.route('/user/:id').get(validatedBearer, readUserValidation, validateBody, userController.readUser)
  .put(validatedBearer, updateUserValidation, validateBody, userController.updateUser)
  .delete(validatedBearer, readUserValidation, validateBody, userController.deleteUser)
router.route('/role').get(validatedBearer, roleController.readAllRoles)
  .post(validatedBearer, createRoleValidation, validateBody, roleController.storeRole)
router.route('/role/options').get(validatedBearer, roleController.optionRoles)
router.route('/role/:id').get(validatedBearer, readRoleValidation, validateBody, roleController.readRole)
  .put(validatedBearer, updateRoleValidation, validateBody, roleController.updateRole)
  .delete(validatedBearer, readRoleValidation, validateBody, roleController.deleteRole)
router.route('/user-role/:id/user').get(validatedBearer, userRoleController.readAllUserRoles)
  .post(validatedBearer, userRoleValidation, validateBody, userRoleController.storeUserRoles)
router.route('/user-role/:id/role').get(validatedBearer, userRoleController.readAllUserRoles)
  .post(validatedBearer, userRoleValidation, validateBody, userRoleController.storeUserRoles)
router.route('/user-role/:id').delete(validatedBearer, userRoleController.deleteUserRoles)
router.route('/role-module/:id').get(validatedBearer, roleModuleController.readAllRoleModules)
  .post(validatedBearer, updateRoleModuleValidation, validateBody, roleModuleController.storeRoleModules)

router.get('*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  return res.status(404).end()
})

module.exports = router
