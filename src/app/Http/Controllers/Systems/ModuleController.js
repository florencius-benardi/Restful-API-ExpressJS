const { responseJson, paginate, validateAccessModule } = require('../../../../config/response')
const permissionConst = require('../../../../app/Const/permissionsConst')
const { readModules } = require('../../Repositories/Systems/Module/ReadModule')

module.exports = {
  readAllModules: async (req, res, next) => {
    try {
      validateAccessModule(req, permissionConst.MODULE_DISPLAY)
      const result = await readModules(req.query)
      paginate(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  optionModules: async (req, res, next) => {
    try {
      const result = await readModules(req.query)
      responseJson(res, 200, 'Retreive data success', result)
    } catch (error) {
      next(error)
    }
  },
}
