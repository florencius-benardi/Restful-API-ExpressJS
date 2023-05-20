const model = require('../../../../../database/sequelize/models/index')
const { whereOr, ilike } = require('../../../../Const/seqParams')
const { ATTR_RELATION_UPDATED_BY, ATTR_RELATION_CREATED_BY, ATTR_CHAR_USERNAME, ATTR_CHAR_LASTNAME, ATTR_CHAR_FIRSTNAME, ATTR_DATETIME_CREATED_AT, ATTR_TABLE, ATTR_RELATION_ROLES } = require('../../../../../database/tableColumns/system/users')

const Users = model[ATTR_TABLE]

exports.readUsers = async (params) => {
  let queryParams = {}
  if ('q' in params)
    queryParams = {
      ...queryParams,
      [whereOr]: [
        {
          [ATTR_CHAR_LASTNAME]:
          {
            [ilike]: `%${params.q}%`
          }
        },
        {
          [ATTR_CHAR_USERNAME]: {
            [ilike]: `%${params.q}%`
          },
        },
        {
          [ATTR_CHAR_FIRSTNAME]:
          {
            [ilike]: `%${params.q}%`
          }
        }
      ]
    }

  return await Users.findAndCountAll({
    where: queryParams,
    include: [ATTR_RELATION_CREATED_BY, ATTR_RELATION_UPDATED_BY],
    offset: ('page' in params) && params.page ? params.page - 1 : 0,
    limit: ('per_page' in params) && params.per_page ? params.per_page : 5,
    order: [
      [
        ('sort_field' in params) && params.sort_field ? params.sort_field : ATTR_DATETIME_CREATED_AT,
        ('sort_order' in params) && params.sort_order && (params.sort_order.toUpperCase() == 'ASC') ? 'ASC' : 'DESC'
      ],
    ]
  })
}

exports.readUser = async (id) => {
  const users = await Users.findByPk(id, {
    include: [ATTR_RELATION_ROLES],
  })
  return users
}

exports.validateFieldUser = async (params, withScope = true) => {
  if (withScope)
    return await Users.findOne({
      where: params
    }).then(exists => {
      return exists;
    }).catch(err => {
      throw err;
    })
  else
    return await Users.unscoped().findOne({
      where: params
    }).then(exists => {
      return exists;
    }).catch(err => {
      throw err;
    })
}
