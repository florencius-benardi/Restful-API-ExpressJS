const { Sequelize } = require('sequelize')
const model = require('../../../../../database/models/index')

const { ATTR_RELATION_UPDATED_BY, ATTR_RELATION_CREATED_BY, ATTR_TABLE, ATTR_INT_ROLE, ATTR_INT_MODULE, ATTR_DATETIME_CREATED_AT, ATTR_RELATION_ROLE, ATTR_RELATION_MODULE } = require('../../../../../database/tableColumns/system/rolemodules')
const modules = require('../../../../../database/tableColumns/system/modules')
const roles = require('../../../../../database/tableColumns/system/roles')
const RoleModules = model[ATTR_TABLE]

exports.updateRoleModules = async (roleId, data, t) => {
  const roleModules = await RoleModules.destroy({
    where: {
      [ATTR_INT_ROLE]: roleId
    },
    transaction: t
  }).then(async function (res) {
    if (res)
      await RoleModules.bulkCreate(data, { validate: true, returning: false, transaction: t })
  }).catch(function (error) {
    throw new Error(error)
  })

  return roleModules
}

