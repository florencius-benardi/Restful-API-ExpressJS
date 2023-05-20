const { Sequelize } = require('sequelize')
const model = require('../../../../../database/models/index')

const { ATTR_INT_USER, ATTR_TABLE, ATTR_INT_ROLE, ATTR_INT_ID } = require('../../../../../database/tableColumns/system/userroles')
const UserRoles = model[ATTR_TABLE]

exports.updateUserRoles = async (data, t) => {
  return await UserRoles.bulkCreate(data,
    {
      validate: true, returning: false,
      conflictFields: [ATTR_INT_ROLE, ATTR_INT_USER],
      ignoreDuplicates: true,
      transaction: t
    })
}

exports.deleteUserRole = async (id, t) => {
  return await UserRoles.destroy({
    where: {
      [ATTR_INT_ID]: id
    },
    transaction: t
  })
}


