const { sequelize } = require('../../../../database/sequelize/models')
const { responseJson, paginate, validateAccessModule } = require('../../../../config/response')
const permissionConst = require('../../../../app/Const/permissionsConst')
const { ATTR_INT_STATUS, ATTR_INT_CREATED_BY, ATTR_INT_ID, ATTR_INT_UPDATED_BY, ATTR_CHAR_FIRSTNAME, ATTR_CHAR_LASTNAME, ATTR_CHAR_EMAIL, ATTR_CHAR_USERNAME, ATTR_CHAR_PASSWORD } = require('../../../../database/tableColumns/system/users')
const { decode } = require('../../../Helper/hashTransaction')
const { readUser, readUsers } = require('../../Repositories/Systems/User/ReadUser')
const storeUser = require('../../Repositories/Systems/User/StoreUser')

module.exports = {
  readAllUsers: async (req, res, next) => {
    try {
      validateAccessModule(req, permissionConst.USER_DISPLAY)
      const result = await readUsers(req.query)
      paginate(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  optionUsers: async (req, res, next) => {
    try {
      const result = await readUsers(req.query)
      responseJson(res, 200, 'Retreive data success', result.count > 0 ? result.rows : null)
    } catch (error) {
      next(error)
    }
  },
  readUser: async (req, res, next) => {
    try {
      validateAccessModule(req, permissionConst.USER_DISPLAY)
      const { id } = req.params
      let decodeId = decode(id)
      const result = await readUser(decodeId)
      responseJson(res, 200, 'Retreive data success', result)
    } catch (error) {
      next(error)
    }
  },
  storeUser: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      validateAccessModule(req, permissionConst.USER_CREATE)
      const { firstname, lastname, username, password, email, userLogin } = req.body
      const storeData = {
        [ATTR_CHAR_FIRSTNAME]: firstname,
        [ATTR_CHAR_LASTNAME]: lastname,
        [ATTR_CHAR_EMAIL]: email,
        [ATTR_CHAR_USERNAME]: username,
        [ATTR_CHAR_PASSWORD]: password,
        [ATTR_INT_CREATED_BY]: userLogin[ATTR_INT_ID],
        [ATTR_INT_UPDATED_BY]: userLogin[ATTR_INT_ID],
        [ATTR_INT_STATUS]: 1
      }
      const result = await storeUser.storeUser(storeData, trx)
      await trx.commit();
      responseJson(res, 200, 'Create user successfully.', result)
    } catch (error) {
      await trx.rollback();
      next(error)
    }
  },
  updateUser: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      validateAccessModule(req, permissionConst.USER_UPDATE)
      const { id } = req.params
      const { firstname, lastname, email, userLogin } = req.body
      let decodeId = decode(id)

      const updateUserParams = {
        [ATTR_INT_UPDATED_BY]: userLogin[ATTR_INT_ID],
        [ATTR_CHAR_FIRSTNAME]: firstname,
        [ATTR_CHAR_LASTNAME]: lastname,
        [ATTR_CHAR_EMAIL]: email,
      }

      await storeUser.updateUser({ [ATTR_INT_ID]: decodeId }, updateUserParams, trx)
      await trx.commit();
      responseJson(res, 200, 'Update user successfully.', null)
    } catch (error) {
      await trx.rollback();
      next(error)
    }
  },
  deleteUser: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      validateAccessModule(req, permissionConst.USER_DELETE)
      const { id } = req.params
      let decodeId = decode(id)
      await storeUser.deleteUser(decodeId, trx)
      await trx.commit();
      responseJson(res, 200, 'Delete user successfully.', null)
    } catch (error) {
      await trx.rollback();
      next(error)
    }
  }
}
