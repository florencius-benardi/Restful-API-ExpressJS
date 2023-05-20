const parseUrl = require('parseurl')
const { param } = require('express-validator')
const { decode } = require('../../../../Helper/hashTransaction')
const { ATTR_INT_ID } = require('../../../../../database/tableColumns/system/roles')
const { validateFieldRole } = require('../../../Repositories/Systems/Role/ReadRole')
const { validateFieldUser } = require('../../../Repositories/Systems/User/ReadUser')

require('dotenv').config()

const userRoleValidation = [
  param('id').notEmpty().withMessage('Invalid ID.').custom(async (value, { req }) => {
    let id = decode(value)
    if (id === undefined)
      throw new Error('Invalid ID.')

    const pathParts = parseUrl(req).pathname.split('/')
    const result = (pathParts[3] == 'user') ? await validateFieldUser({ [ATTR_INT_ID]: id }) : await validateFieldRole({ [ATTR_INT_ID]: id })
    if (!result)
      throw new Error(`Role not found.`)
  })
]

module.exports = {
  userRoleValidation
}
