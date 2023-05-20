const { header, validationResult } = require('express-validator')
const { validateToken } = require('../Controllers/Auth/oauth')
const { readUser } = require('../Repositories/Systems/User/ReadUser')
const { ATTR_INT_USER, ATTR_JSON_ABILITIES } = require('../../../database/tableColumns/system/usertokens')

const validatedBearer = async (req, res, next) => {
  try {
    await header('authorization')
      .exists({ checkFalsy: true })
      .withMessage("Unauthenticated.") // you can specify the message to show if a validation has failed
      .bail()
      .contains("Bearer")
      .withMessage("Authorization Token is not Bearer.").custom(async (value) => {
        if (value.includes('|')) {
          let validate = await validateToken(value)
          if (!validate)
            throw new Error('Unauthenticated.')

          const userResult = await readUser(validate.get({ plain: true })[ATTR_INT_USER])
          let permissions = validate.get({ plain: true })

          req.body.userPermissions = permissions[ATTR_JSON_ABILITIES]
          req.body.userLogin = userResult.get({ plain: true })

        } else
          throw new Error('Unauthenticated.')
      }).run(req)

    const errors = validationResult(req)
    if (errors.isEmpty())
      return next()

    return res.status(401).json({
      status: false,
      message: errors.array()[0].msg
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  validatedBearer
}
