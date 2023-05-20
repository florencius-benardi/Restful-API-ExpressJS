const model = require('../../../../../database/sequelize/models/index')
const { whereOr, ilike } = require('../../../../Const/seqParams')

const { ATTR_RELATION_UPDATED_BY, ATTR_RELATION_CREATED_BY, ATTR_TABLE, ATTR_CHAR_DESCRIPTION, ATTR_DATETIME_CREATED_AT, ATTR_INT_ID } = require('../../../../../database/tableColumns/system/modules')
const Modules = model[ATTR_TABLE]

exports.readModules = async (params) => {
  let queryParams = {}
  if ('q' in params)
    queryParams = {
      ...queryParams,
      [whereOr]: [
        {
          [ATTR_CHAR_DESCRIPTION]:
          {
            [ilike]: `%${params.q}%`
          }
        }
      ]
    }

  if ('module' in params && (params.module.constructor == Array))
    queryParams = {
      ...queryParams,
      [ATTR_INT_ID]: {
        [whereOr]: params.module
      }
    }

  return await Modules.findAndCountAll({
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

exports.validateFieldModule = async (param) => {
  return await Modules.findOne({
    where: param
  }).then(exists => {
    return exists;
  }).catch(err => {
    throw err;
  })
}
