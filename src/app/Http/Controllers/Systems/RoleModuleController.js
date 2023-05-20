const { decode } = require('../../../Helper/hashTransaction')
const { sequelize } = require('../../../../database/models')
const { responseJson, paginate, validateAccessModule } = require('../../../../config/response')
const permissionConst = require('../../../../app/Const/permissionsConst')
const { ATTR_INT_ROLE, ATTR_INT_MODULE, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY } = require('../../../../database/tableColumns/system/rolemodules')
const { ATTR_INT_ID } = require('../../../../database/tableColumns/system/users')
const { readRoleModules } = require('../../Repositories/Systems/RoleModule/ReadRoleModule')
const { updateRoleModules } = require('../../Repositories/Systems/RoleModule/StoreRoleModule')

module.exports = {
  readAllRoleModules: async (req, res, next) => {
    try {
      validateAccessModule(req, permissionConst.ROLE_DISPLAY)
      const { id } = req.params
      let decodeId = decode(id)
      const data = { ...req.query, role: decodeId, }
      const modules = await readRoleModules(data)
      paginate(req, res, modules)
    } catch (error) {
      next(error)
    }
  },
  storeRoleModules: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      validateAccessModule(req, permissionConst.ROLE_UPDATE)
      const { id } = req.params
      const { module, userLogin } = req.body
      let decodeId = decode(id)
      let bulkInsert = []
      if (module && (module.constructor === Array))
        for (let m of module) {
          if (m !== '')
            bulkInsert.push({
              [ATTR_INT_ROLE]: decodeId,
              [ATTR_INT_MODULE]: m,
              [ATTR_INT_CREATED_BY]: userLogin[ATTR_INT_ID],
              [ATTR_INT_UPDATED_BY]: userLogin[ATTR_INT_ID]
            })
        }

      await updateRoleModules(decodeId, bulkInsert, trx)
      await trx.commit();
      const modules = await readRoleModules({ role: decodeId })
      responseJson(res, 200, 'Update role success', modules)
    } catch (error) {
      await trx.rollback();
      next(error)
    }
  },
  deleteRoleModules: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      validateAccessModule(req, permissionConst.ROLE_UPDATE)
      const { id } = req.params
      const { module, userLogin } = req.body
      let decodeId = decode(id)
      let bulkInsert = []
      if (module && (module.constructor === Array))
        for (let m of moduleBody) {
          if (m !== '')
            bulkInsert.push({
              [ATTR_INT_ROLE]: decodeId,
              [ATTR_INT_MODULE]: m,
              [ATTR_INT_CREATED_BY]: userLogin[ATTR_INT_ID],
              [ATTR_INT_UPDATED_BY]: userLogin[ATTR_INT_ID]
            })
        }

      await updateRoleModules(decodeId, bulkInsert, trx)
      await trx.commit();
      const modules = await readRoleModules(decodeId)
      responseJson(res, 200, 'Retreive data success', modules)
    } catch (error) {
      await trx.rollback();
      next(error)
    }
  }
}
