const model = require('../../../../../database/sequelize/models/index')
const rolemodules = require('../../../../../database/tableColumns/system/rolemodules')
const { whereOr, ilike, whereIn } = require('../../../../Const/seqParams')

const { ATTR_RELATION_UPDATED_BY, ATTR_RELATION_CREATED_BY, ATTR_TABLE, ATTR_CHAR_DESCRIPTION, ATTR_DATETIME_CREATED_AT, ATTR_RELATION_MODULES, ATTR_RELATION_ORGANIZATION } = require('../../../../../database/tableColumns/system/roles')
const { ATTR_INT_ID } = require('../../../../../database/tableColumns/system/userroles')
const Roles = model[ATTR_TABLE]
const RoleModules = model[rolemodules.ATTR_TABLE]

exports.readRoles = async (params) => {
  let queryParams = {}
  if ('q' in params)
    queryParams = {
      ...queryParams,
      [whereOr]: [{
        [ATTR_CHAR_DESCRIPTION]: {
          [ilike]: `%${params.q}%`
        }
      }]
    }

  if ('role' in params && (params.role.constructor == Array))
    queryParams = {
      ...queryParams,
      [where]: [{
        [ATTR_INT_ID]: {
          [whereIn]: `%${params.role}%`
        }
      }]
    }


  return await Roles.findAndCountAll({
    where: queryParams,
    include: [ATTR_RELATION_CREATED_BY, ATTR_RELATION_UPDATED_BY],
    offset: ('page' in params) && params.page ? params.page - 1 : 0,
    limit: ('per_page' in params) && params.per_page ? params.per_page : null,
    order: [
      [
        ('sort_field' in params) && params.sort_field ? params.sort_field : ATTR_DATETIME_CREATED_AT,
        ('sort_order' in params) && params.sort_order && (params.sort_order.toUpperCase() == 'ASC') ? 'ASC' : 'DESC'
      ],
    ]
  })
}

exports.readRole = async (id) => {
  return await Roles.findByPk(id, {
    include: [
      { model: RoleModules, as: ATTR_RELATION_MODULES, attributes: ['module_id'] },
      ATTR_RELATION_ORGANIZATION
    ],
    // group: [rolemodules.ATTR_INT_ROLE,]
    // include: [{ model: model['rolemodules'], attributes: ["role_id"] }],
  })
}

exports.validateFieldRole = async (params) => {
  return await Roles.findOne({
    where: params
  }).then(exists => {
    return exists;
  }).catch(err => {
    throw err;
  })
}
