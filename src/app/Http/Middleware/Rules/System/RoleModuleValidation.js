const { body, param } = require('express-validator')
const { decode } = require('../../../../Helper/hashTransaction')
const { ATTR_INT_ID } = require('../../../../../database/tableColumns/system/roles')
const { validateFieldRole } = require('../../../Repositories/Systems/Role/ReadRole')
const { validateFieldModule } = require('../../../Repositories/Systems/Module/ReadModule')

require('dotenv').config()

const updateRoleModuleValidation = [
  param('id').notEmpty().withMessage('Invalid ID.').custom(async (value, { req }) => {
    let id = decode(value)
    if (id === undefined)
      throw new Error('Invalid ID.')

    const result = await validateFieldRole({ [ATTR_INT_ID]: id })
    if (!result)
      throw new Error('Role not found.')
  }),
  body('module').custom(async (value) => {
    if (value.constructor === Array && value.length > 0)
      for (let v of value) {
        if (v !== '') {
          const result = await validateFieldModule({ [ATTR_INT_ID]: v })
          if (!result)
            throw new Error('Module not found.')
        }
      }
  })
]

module.exports = {
  updateRoleModuleValidation
}
