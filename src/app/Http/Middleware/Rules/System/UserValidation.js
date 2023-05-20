const bcrypt = require('bcrypt')
const { body, check, param } = require('express-validator')
const { ATTR_CHAR_EMAIL, ATTR_CHAR_USERNAME, ATTR_INT_STATUS, ATTR_CHAR_PASSWORD, ATTR_INT_ID, ATTR_INT_WRONG_PASS, ATTR_INT_UPDATED_BY } = require('../../../../../database/tableColumns/system/users')
const { validateFieldUser } = require('../../../Repositories/Systems/User/ReadUser')
const { updateUser } = require('../../../Repositories/Systems/User/StoreUser')
const { whereNot } = require('../../../../Const/seqParams')
const { decode } = require('../../../../Helper/hashTransaction')
const { isEmail } = require('../../../../Helper/validateParam')

require('dotenv').config()

const createUserValidation = [
  check('email').isEmail().custom(async (value) => {
    const result = await validateFieldUser({ [ATTR_CHAR_EMAIL]: value.toLowerCase() })
    if (result)
      throw new Error('Email has been taken.')
  }),
  check('username', 'User name is required.').notEmpty()
    .custom(async (value) => {
      const result = await validateFieldUser({ [ATTR_CHAR_USERNAME]: value.toUpperCase() })
      if (result)
        throw new Error('Username has been taken.')
    }),
  check('firstname').notEmpty().withMessage('First name is required.').isLength({ min: 2, max: 50 }).withMessage('First name length minimum 5 and maximum 50 character.'),
  check('lastname', 'Last name maximum length is 50 character.').isLength({ max: 50 }).optional({ nullable: true }),
  check('password', 'Please enter the password.').notEmpty().isLength({ min: 8 }).withMessage('Minimum length the password is 8 character.'),
  check('password_confirmation', 'Confirm password does not match with the password.').custom((value, { req }) => { return (value === req.body.password) }),
]

const updateUserValidation = [
  check('email').isEmail().custom(async (value, { req }) => {
    let id = decode(req.params.id)
    if (id === undefined)
      throw new Error('Invalid ID.')

    const result = await validateFieldUser({
      [ATTR_CHAR_EMAIL]: value.toLowerCase(), [ATTR_INT_ID]: {
        [whereNot]: id
      }
    })
    if (result)
      throw new Error('Email has been taken.')
  }),
  check('firstname').notEmpty().withMessage('First name is required.').isLength({ min: 2, max: 50 }).withMessage('First name length minimum 5 and maximum 50 character.'),
  check('lastname', 'Last name maximum length is 50 character.').isLength({ max: 50 }).optional({ nullable: true }),
]

const readUserValidation = [
  param('id').notEmpty().withMessage('Invalid ID.').custom(async (value) => {
    let id = decode(value)
    if (id === undefined)
      throw new Error('Invalid ID.')

    const result = await validateFieldUser({ [ATTR_INT_ID]: id })
    if (!result)
      throw new Error('User has been deleted.')
  }),
]

const loginValidation = [
  check('email').notEmpty().withMessage('Please enter the Username / Email.').if(body('email').exists()).notEmpty().custom(async (value, { req }) => {
    let validEmail = isEmail(value)
    const field = validEmail ? ATTR_CHAR_EMAIL : ATTR_CHAR_USERNAME;
    const newValue = (field == ATTR_CHAR_EMAIL) ? value.toLowerCase() : value.toUpperCase()
    req.body.email = newValue;
    req.body.isEmail = (field == ATTR_CHAR_EMAIL)

    const result = await validateFieldUser({ [field]: newValue }, false)
    if (!result)
      throw new Error('Please input registered Email or Username.')
    else {
      switch (result[ATTR_INT_STATUS]) {
        case 0:
          throw new Error('Registered account is inactive. Please check your email to activate your account.')
        case 2:
          throw new Error('You account is blocked. Please contact your administrator')
        default:
          req.body.user_valid = true
          req.body.user_data = result
          break;
      }
    }
  }),
  check('password', 'Please enter the password.').notEmpty().if(body('user_valid').exists()).notEmpty().custom(async (value, { req }) => {
    const validate = await bcrypt.compareSync(value, req.body.user_data[ATTR_CHAR_PASSWORD])
    if (!validate) {

      if (parseInt(req.body.user_data[ATTR_INT_ID]) != 1) {
        const maxLogin = process.env.MAXIMUM_TRY_LOGIN ?? 5
        const wrongPass = parseInt(req.body.user_data[ATTR_INT_WRONG_PASS]) + 1
        await updateUser(
          { [ATTR_INT_ID]: parseInt(req.body.user_data[ATTR_INT_ID]) },
          {
            [ATTR_INT_WRONG_PASS]: wrongPass,
            [ATTR_INT_STATUS]: wrongPass >= maxLogin ? 2 : req.body.user_data[ATTR_INT_STATUS],
            [ATTR_INT_UPDATED_BY]: 1,
          },
        )
      }
      throw new Error('The password you entered is incorrect.')
    }
  }),
]

module.exports = {
  createUserValidation,
  readUserValidation,
  updateUserValidation,
  loginValidation
}
