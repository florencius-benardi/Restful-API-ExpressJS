const { decode } = require('../../../Helper/hashTransaction')
const { sequelize } = require('../../../../database/models')
const { responseJson, paginate, validateAccessModule } = require('../../../../config/response')
const permissionConst = require('../../../../app/Const/permissionsConst')
const { ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_CHAR_DESCRIPTION, ATTR_RELATION_ORGANIZATION } = require('../../../../database/tableColumns/system/roles')
const { ATTR_ARRAY_KEY, ATTR_CHAR_KEY, ATTR_JSON_VALUE, ATTR_PARAM_LOCATION, ATTR_PARAM_LOCATION_GROUP, ATTR_PARAM_BRAND, ATTR_INT_ROLE } = require('../../../../database/tableColumns/system/roleorganization')
const { ATTR_INT_ID } = require('../../../../database/tableColumns/system/users')
const { readRole, readRoles } = require('../../Repositories/Systems/Role/ReadRole')
const { storeRole, updateRole, deleteRole } = require('../../Repositories/Systems/Role/StoreRole')
const { readLocations } = require('../../Repositories/Masters/Location/ReadLocation')
const { readLocationGroups } = require('../../Repositories/Masters/LocationGroup/ReadLocationGroup')
const { readBrands } = require('../../Repositories/Masters/Brand/ReadBrand')
const { readRoleOrganization } = require('../../Repositories/Systems/RoleOrganization/ReadRoleOrganization')
const { updateRoleOrganization } = require('../../Repositories/Systems/RoleOrganization/StoreRoleOrganization')

module.exports = {
  readAllRoles: async (req, res, next) => {
    try {
      validateAccessModule(req, permissionConst.ROLE_DISPLAY)
      const result = await readRoles(req.query)
      paginate(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  optionRoles: async (req, res, next) => {
    try {
      const result = await readRoles(req.query)
      responseJson(res, 200, 'Retreive data success', result.count > 0 ? result.rows : null)
    } catch (error) {
      next(error)
    }
  },
  readRole: async (req, res, next) => {
    try {
      validateAccessModule(req, permissionConst.ROLE_DISPLAY)
      const { id } = req.params
      let decodeId = decode(id)
      const result = await readRole(decodeId)

      let organizationRole = {}
      let resultPlain = result.get({ plain: true })

      for (let i of ATTR_ARRAY_KEY) {
        organizationRole[i] = []
        if (resultPlain[ATTR_RELATION_ORGANIZATION] && resultPlain[ATTR_RELATION_ORGANIZATION].length > 0) {
          var roleParam = resultPlain[ATTR_RELATION_ORGANIZATION].find(v => v[ATTR_CHAR_KEY] === i);
          if (roleParam)
            switch (roleParam[ATTR_CHAR_KEY]) {
              case ATTR_PARAM_LOCATION:
                if (roleParam[ATTR_JSON_VALUE] && Array.isArray(roleParam[ATTR_JSON_VALUE]) && roleParam[ATTR_JSON_VALUE].length > 0) {
                  const resultLocations = await readLocations({ [ATTR_INT_ID]: roleParam[ATTR_JSON_VALUE] })
                  organizationRole[i] = resultLocations ? resultLocations.rows : null
                }
                break;
              case ATTR_PARAM_LOCATION_GROUP:
                if (roleParam[ATTR_JSON_VALUE] && Array.isArray(roleParam[ATTR_JSON_VALUE]) && roleParam[ATTR_JSON_VALUE].length > 0) {
                  const resultLocationGroups = await readLocationGroups({ [ATTR_INT_ID]: roleParam[ATTR_JSON_VALUE] })
                  organizationRole[i] = resultLocationGroups ? resultLocationGroups.rows : null
                }
                break;
              default:
                if (roleParam[ATTR_JSON_VALUE] && Array.isArray(roleParam[ATTR_JSON_VALUE]) && roleParam[ATTR_JSON_VALUE].length > 0) {
                  const resultSoldBrands = await readBrands({ [ATTR_INT_ID]: roleParam[ATTR_JSON_VALUE] })
                  organizationRole[i] = resultSoldBrands ? resultSoldBrands.rows : null
                }
                break;
            }
        }
      }

      let plain = { ...resultPlain, [ATTR_RELATION_ORGANIZATION]: organizationRole }
      responseJson(res, 200, 'Retreive data success', plain)
    } catch (error) {
      next(error)
    }
  },
  storeRole: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      validateAccessModule(req, permissionConst.ROLE_CREATE)
      const { description, userLogin } = req.body
      const storeData = {
        [ATTR_CHAR_DESCRIPTION]: description,
        [ATTR_INT_CREATED_BY]: userLogin[ATTR_INT_ID],
        [ATTR_INT_UPDATED_BY]: userLogin[ATTR_INT_ID]
      }
      const result = await storeRole(storeData, trx)
      await trx.commit();
      responseJson(res, 200, 'Create role successfully.', result)
    } catch (error) {
      await trx.rollback();
      next(error)
    }
  },
  updateRole: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      validateAccessModule(req, permissionConst.ROLE_UPDATE)
      const { id } = req.params
      const { description, userLogin } = req.body
      let decodeId = decode(id)
      const storeData = {
        [ATTR_CHAR_DESCRIPTION]: description,
        [ATTR_INT_CREATED_BY]: userLogin[ATTR_INT_ID],
        [ATTR_INT_UPDATED_BY]: userLogin[ATTR_INT_ID]
      }
      await updateRole({ [ATTR_INT_ID]: decodeId }, storeData, trx)
      await trx.commit();
      responseJson(res, 200, 'Update role successfully.', null)
    } catch (error) {
      await trx.rollback();
      next(error)
    }
  },
  deleteRole: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      validateAccessModule(req, permissionConst.ROLE_DELETE)
      const { id } = req.params
      let decodeId = decode(id)
      await deleteRole(decodeId, trx)
      await trx.commit();
      responseJson(res, 200, 'Delete role successfully.', null)
    } catch (error) {
      await trx.rollback();
      next(error)
    }
  },
  readRoleOrganization: async (req, res, next) => {
    try {
      validateAccessModule(req, permissionConst.ROLE_DISPLAY)
      const { id } = req.params
      let decodeId = decode(id)
      const result = await readRoleOrganization(decodeId)
      let organizationRole = {}
      let resultPlain = result?.rows.map(r => { return r.get({ plain: true }) })

      for (let i of ATTR_ARRAY_KEY) {
        organizationRole[i] = []
        if (resultPlain && resultPlain.length > 0) {
          var roleParam = resultPlain.find(v => v[ATTR_CHAR_KEY] === i);
          if (roleParam)
            switch (roleParam[ATTR_CHAR_KEY]) {
              case ATTR_PARAM_LOCATION:
                if (roleParam[ATTR_JSON_VALUE] && Array.isArray(roleParam[ATTR_JSON_VALUE]) && roleParam[ATTR_JSON_VALUE].length > 0) {
                  const resultLocations = await readLocations({ [ATTR_INT_ID]: roleParam[ATTR_JSON_VALUE] })
                  organizationRole[i] = resultLocations ? resultLocations.rows : null
                }
                break;
              case ATTR_PARAM_LOCATION_GROUP:
                if (roleParam[ATTR_JSON_VALUE] && Array.isArray(roleParam[ATTR_JSON_VALUE]) && roleParam[ATTR_JSON_VALUE].length > 0) {
                  const resultLocationGroups = await readLocationGroups({ [ATTR_INT_ID]: roleParam[ATTR_JSON_VALUE] })
                  organizationRole[i] = resultLocationGroups ? resultLocationGroups.rows : null
                }
                break;
              default:
                if (roleParam[ATTR_JSON_VALUE] && Array.isArray(roleParam[ATTR_JSON_VALUE]) && roleParam[ATTR_JSON_VALUE].length > 0) {
                  const resultSoldBrands = await readBrands({ [ATTR_INT_ID]: roleParam[ATTR_JSON_VALUE] })
                  organizationRole[i] = resultSoldBrands ? resultSoldBrands.rows : null
                }
                break;
            }
        }
      }

      responseJson(res, 200, 'Retreive data success', organizationRole)
    } catch (error) {
      next(error)
    }
  },
  storeRoleOrganization: async (req, res, next) => {
    const { id } = req.params
    let decodeId = decode(id)
    const trx = await sequelize.transaction();
    try {
      validateAccessModule(req, permissionConst.ROLE_UPDATE)
      const { userLogin } = req.body

      for (k of ATTR_ARRAY_KEY) {
        const storeData = {
          [ATTR_CHAR_KEY]: k,
          [ATTR_JSON_VALUE]: req.body[k] ?? null,
          [ATTR_INT_CREATED_BY]: userLogin[ATTR_INT_ID],
          [ATTR_INT_UPDATED_BY]: userLogin[ATTR_INT_ID]
        }

        await updateRoleOrganization({ [ATTR_CHAR_KEY]: k, [ATTR_INT_ROLE]: decodeId }, storeData, trx)
      }
      await trx.commit();
      responseJson(res, 200, 'Update role successfully.', null)
    } catch (error) {
      await trx.rollback();
      next(error)
    }
  },
}
