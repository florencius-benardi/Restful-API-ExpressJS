const { body, check, param } = require('express-validator')
const { decode } = require('../../../../Helper/hashTransaction')
const { ATTR_CHAR_DESCRIPTION, ATTR_INT_ID } = require('../../../../../database/tableColumns/system/roles')
const { validateFieldRole } = require('../../../Repositories/Systems/Role/ReadRole')
const { whereNot, whereIn } = require('../../../../Const/seqParams')
const { validateFieldLocation } = require('../../../Repositories/Masters/Location/ReadLocation')
const { isArray, lenArr } = require('../../../../Helper/validateParam')
const { validateFieldLocationGroup } = require('../../../Repositories/Masters/LocationGroup/ReadLocationGroup')
const { validateFieldBrand } = require('../../../Repositories/Masters/Brand/ReadBrand')

require('dotenv').config()

const createRoleValidation = [
    check('description').isLength({ min: 2, max: 50 }).withMessage('Description min 2 and max 50 character.').custom(async (value) => {
        const result = await validateFieldRole({ [ATTR_CHAR_DESCRIPTION]: value.toUpperCase() })
        if (result)
            throw new Error('Role description has been taken.')
    }),
]

const readRoleValidation = [
    param('id').notEmpty().withMessage('Invalid ID.').custom(async (value) => {
        let id = decode(value)
        if (id === undefined)
            throw new Error('Invalid ID.')

        const result = await validateFieldRole({
            [ATTR_INT_ID]: id
        })
        if (!result)
            throw new Error('Role has been deleted.')
    }),
]

const updateRoleValidation = [
    param('id').notEmpty().withMessage('Invalid ID.').custom(async (value) => {
        let id = decode(value)
        if (id === undefined)
            throw new Error('Invalid ID.')

        const result = await validateFieldRole({
            [ATTR_INT_ID]: id
        })

        if (!result)
            throw new Error('Role has been deleted.')
    }),
    body('description').isLength({ min: 2, max: 50 }).withMessage('Description min 2 and max 50 character.').custom(async (value, { req }) => {
        let id = await decode(req.params.id)
        if (id === undefined)
            throw new Error('Invalid ID.')

        const result = await validateFieldRole({
            [ATTR_CHAR_DESCRIPTION]: value.toUpperCase(),
            [ATTR_INT_ID]: {
                [whereNot]: id
            }
        })
        if (result)
            throw new Error('Role description has been taken.')
    })
]

const updateRoleOrgValidation = [
    param('id').notEmpty().withMessage('Invalid ID.').custom(async (value) => {
        let id = decode(value)
        if (id === undefined)
            throw new Error('Invalid ID.')

        const result = await validateFieldRole({
            [ATTR_INT_ID]: id
        })

        if (!result)
            throw new Error('Role not found !')
    }),
    body('location').custom(async (value, { req }) => {

        if (isArray(value) && lenArr(value) > 0) {
            for (v of value) {
                const result = await validateFieldLocation({
                    [ATTR_INT_ID]: v
                })
                if (!result)
                    throw new Error('Location not found.')
            }
        }
    }),
    body('location_group').custom(async (value, { req }) => {
        if (isArray(value) && lenArr(value) > 0) {
            for (v of value) {
                const result = await validateFieldLocationGroup({
                    [ATTR_INT_ID]: v
                })
                if (!result)
                    throw new Error('Location Group not found.')
            }
        }
    }),
    body('brand').custom(async (value, { req }) => {
        if (isArray(value) && lenArr(value) > 0) {
            for (v of value) {
                const result = await validateFieldBrand({
                    [ATTR_INT_ID]: v
                })
                if (!result)
                    throw new Error('Brand not found.')
            }
        }
    })
]

module.exports = {
    createRoleValidation,
    updateRoleValidation,
    updateRoleOrgValidation,
    readRoleValidation,
}
