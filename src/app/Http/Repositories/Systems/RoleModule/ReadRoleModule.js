const { Sequelize } = require('sequelize')
const { whereOr, whereIn } = require('../../../../Const/seqParams')
const model = require('../../../../../database/sequelize/models/index')

const { ATTR_RELATION_UPDATED_BY, ATTR_RELATION_CREATED_BY, ATTR_TABLE, ATTR_INT_ROLE, ATTR_INT_MODULE, ATTR_DATETIME_CREATED_AT, ATTR_RELATION_ROLE, ATTR_RELATION_MODULE } = require('../../../../../database/tableColumns/system/rolemodules')
const modules = require('../../../../../database/tableColumns/system/modules')
const roles = require('../../../../../database/tableColumns/system/roles')
const RoleModules = model[ATTR_TABLE]

exports.readRoleModules = async (params) => {
  let queryParams = {}

  if (params && ('q' in params))
    queryParams = {
      ...queryParams,
      [whereOr]: [
        Sequelize.literal(`"${ATTR_RELATION_MODULE}".` + modules.ATTR_CHAR_DESCRIPTION + ` LIKE '%${params.q.toUpperCase()}%'`),
        Sequelize.literal(`"${ATTR_RELATION_ROLE}".` + roles.ATTR_CHAR_DESCRIPTION + ` LIKE '%${params.q.toUpperCase()}%'`)
      ]
    }

  if (params && ('role' in params))
    if (params.role instanceof Array)
      queryParams = {
        ...queryParams,
        [ATTR_INT_ROLE]: {
          [whereIn]: params.role
        }
      }
    else
      queryParams = { ...queryParams, [ATTR_INT_ROLE]: params.role }

  return await RoleModules.findAndCountAll({
    where: queryParams,
    include: [ATTR_RELATION_CREATED_BY, ATTR_RELATION_UPDATED_BY, ATTR_RELATION_ROLE, ATTR_RELATION_MODULE],
    offset: (params && ('page' in params) && params.page) ? params.page - 1 : 0,
    limit: (params && ('per_page' in params) && params.per_page) ? params.per_page : null,
    order: [
      [
        (params && ('sort_field' in params) && params.sort_field) ? params.sort_field : ATTR_DATETIME_CREATED_AT,
        (params && ('sort_order' in params) && params.sort_order && (params.sort_order.toUpperCase() == 'ASC')) ? 'ASC' : 'DESC'
      ],
    ]
  })
}


