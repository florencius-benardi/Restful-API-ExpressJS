const model = require('../../../../../database/models/index')
const { whereOr, whereIn } = require('../../../../Const/seqParams')

const { ATTR_RELATION_UPDATED_BY, ATTR_RELATION_CREATED_BY, ATTR_INT_USER, ATTR_TABLE, ATTR_INT_ROLE, ATTR_INT_MODULE, ATTR_DATETIME_CREATED_AT, ATTR_RELATION_ROLE, ATTR_RELATION_MODULE, ATTR_RELATION_USER } = require('../../../../../database/tableColumns/system/userroles')
const users = require('../../../../../database/tableColumns/system/users')
const roles = require('../../../../../database/tableColumns/system/roles')
const { Sequelize } = require('sequelize')
const UserRoles = model[ATTR_TABLE]

exports.readUserRoles = async (params) => {
  let queryParams = {}
  if (params && ('q' in params))
    queryParams = {
      ...queryParams,
      [whereOr]: [
        Sequelize.literal(`"${ATTR_RELATION_USER}".` + users.ATTR_CHAR_FIRSTNAME + ` LIKE '%${params.q.toUpperCase()}%'`),
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

  if (params && ('user' in params))
    if (params.user instanceof Array)
      queryParams = {
        ...queryParams,
        [ATTR_INT_USER]: {
          [whereIn]: params.user
        }
      }
    else
      queryParams = { ...queryParams, [ATTR_INT_USER]: params.user }

  return await UserRoles.findAndCountAll({
    where: queryParams,
    include: [ATTR_RELATION_CREATED_BY, ATTR_RELATION_UPDATED_BY, ATTR_RELATION_ROLE, ATTR_RELATION_USER],
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


