
const { parallel } = require('async')
const { ATTR_INT_ID, ATTR_INT_WRONG_PASS, ATTR_CHAR_PASSWORD, ATTR_DATETIME_LAST_REQUEST_TIME, ATTR_CHAR_CONFIRMATION_CODE, ATTR_DATETIME_VERIFIED } = require('../../../../database/tableColumns/system/users')
const { updateUser } = require('../../Repositories/Systems/User/StoreUser')
const { readUser } = require('../../Repositories/Systems/User/ReadUser')
const { readRoles } = require('../../Repositories/Systems/Role/ReadRole')
const { readModules } = require('../../Repositories/Systems/Module/ReadModule')
const { readRoleModules } = require('../../Repositories/Systems/RoleModule/ReadRoleModule')
const { generateToken, revokeToken, setAccessToken } = require('./oauth')
const { pluck } = require('../../../Helper/manipulateVariable')
const { ATTR_INT_ROLE } = require('../../../../database/tableColumns/system/userroles')
const rolemodules = require('../../../../database/tableColumns/system/rolemodules')
const modules = require('../../../../database/tableColumns/system/modules')

module.exports = {
  login: async (req, res, next) => {
    try {
      await parallel({
        result: async () => {
          return await updateUser(
            { [ATTR_INT_ID]: parseInt(req.body.user_data[ATTR_INT_ID]) },
            {
              [ATTR_INT_WRONG_PASS]: 0
            },
          )
        },
        user: async () => {
          let usersResult = await readUser(req.body.user_data[ATTR_INT_ID])
          return usersResult.get({ plain: true })
        },
        token: async () => {
          return await generateToken(req.body.user_data[ATTR_INT_ID])
        },
      }, async function (err, results) {
        if (err)
          throw new Error(err)

        if (results.user.roles) {
          let params = { 'role': pluck(results.user.roles, ATTR_INT_ROLE) }
          const roleModules = await readRoleModules(params)
          if (roleModules.rows) {
            let moduleArray = await pluck(roleModules.rows, rolemodules.ATTR_INT_MODULE)

            const moduleList = await readModules({ 'module': moduleArray })
            const permissions = pluck(moduleList.rows, modules.ATTR_CHAR_OBJECT)

            if (moduleList)
              results = { ...results, permissions }

            await setAccessToken(results.token, permissions)
          }
        }

        res.status(200).json({
          status: true,
          message: 'Login Success',
          data: results
        })
      })
      return
    } catch (error) {
      next(error)
    }
  },
  logout: async (req, res, next) => {
    try {
      await revokeToken(req.headers.authorization)
      return res.status(200).json({
        status: true,
        message: 'Logout Success'
      })
    } catch (error) {
      next(error)
    }
  },
  loginMerchant: async (req, res, next) => {
    try {
      await parallel({
        result: async () => {
          return await updateUser(
            { [ATTR_INT_ID]: parseInt(req.body.user_data[ATTR_INT_ID]) },
            {
              [ATTR_INT_WRONG_PASS]: 0
            },
          )
        },
        user: async () => {
          let usersResult = await readUser(req.body.user_data[ATTR_INT_ID])
          return usersResult.get({ plain: true })
        },
        token: async () => {
          return await generateToken(req.body.user_data[ATTR_INT_ID])
        },
      }, async function (err, results) {
        if (err)
          throw new Error(err)

        if (results.user.roles) {
          let params = { 'role': pluck(results.user.roles, ATTR_INT_ROLE) }
          const roleModules = await readRoleModules(params)
          if (roleModules.rows) {
            let moduleArray = await pluck(roleModules.rows, rolemodules.ATTR_INT_MODULE)

            const moduleList = await readModules({ 'module': moduleArray })
            const permissions = pluck(moduleList.rows, modules.ATTR_CHAR_OBJECT)

            if (moduleList)
              results = { ...results, permissions }

            await setAccessToken(results.token, permissions)
          }
        }

        res.status(200).json({
          status: true,
          message: 'Login Success',
          data: results
        })
      })
      return
    } catch (error) {
      next(error)
    }
  },
}
