const parseUrl = require('parseurl')
const { sequelize } = require('../../../../database/models')
const { responseJson, paginate, validateAccessModule } = require('../../../../config/response')
const permissionConst = require('../../../../app/Const/permissionsConst')
const { ATTR_INT_ROLE, ATTR_INT_MODULE, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY } = require('../../../../database/tableColumns/system/rolemodules')
const { ATTR_INT_ID } = require('../../../../database/tableColumns/system/users')
const { decode } = require('../../../Helper/hashTransaction')
const { readUserRoles } = require('../../Repositories/Systems/UserRole/ReadUserRole')
const { updateUserRoles, deleteUserRole } = require('../../Repositories/Systems/UserRole/StoreUserRole')
const { ATTR_INT_USER } = require('../../../../database/tableColumns/system/userroles')

module.exports = {
  readAllUserRoles: async (req, res, next) => {
    try {
      let field = ATTR_INT_ROLE
      const { id } = req.params
      const pathParts = parseUrl(req).pathname.split('/')
      if (pathParts[3] && pathParts[3] == 'user') {
        validateAccessModule(req, permissionConst.USER_DISPLAY)
        field = ATTR_INT_USER
      } else {
        validateAccessModule(req, permissionConst.ROLE_DISPLAY)
        field = ATTR_INT_ROLE
      }
      let decodeId = decode(id)
      const data = { ...req.query, [field]: decodeId }

      const result = await readUserRoles(data)
      paginate(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  storeUserRoles: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      const { id } = req.params
      const { role, user, userLogin } = req.body
      let data = null
      let field = null
      let bulkInsert = []
      let decodeId = decode(id)
      const pathParts = parseUrl(req).pathname.split('/')
      if (pathParts[3] == 'user') {
        validateAccessModule(req, permissionConst.USER_UPDATE)
        field = [ATTR_INT_USER]
        data = role
      } else {
        validateAccessModule(req, permissionConst.ROLE_UPDATE)
        field = [ATTR_INT_ROLE]
        data = user
      }

      let insertField = pathParts[3] == 'user' ? [ATTR_INT_ROLE] : [ATTR_INT_USER]
      if (data && (data.constructor === Array) && (data.length > 0))
        for (let d of data) {
          if (d !== '')
            bulkInsert.push({
              [field]: decodeId,
              [insertField]: d,
              [ATTR_INT_CREATED_BY]: userLogin[ATTR_INT_ID],
              [ATTR_INT_UPDATED_BY]: userLogin[ATTR_INT_ID]
            })
        }

      await updateUserRoles(bulkInsert, trx)
      insertField = pathParts[3] == 'user' ? 'user' : 'role'
      const result = await readUserRoles({
        [insertField]: decodeId
      })
      await trx.commit();
      responseJson(res, 200, 'Retreive data success', result)
    } catch (error) {
      await trx.rollback();
      next(error)
    }
  },
  deleteUserRoles: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      validateAccessModule(req, permissionConst.USER_UPDATE)
      const { id } = req.params
      let decodeId = decode(id)
      const result = await deleteUserRole(decodeId, trx)
      await trx.commit();
      responseJson(res, 200, 'Delete data success', result)
    } catch (error) {
      await trx.rollback();
      next(error)
    }
  }
}
