const { header, validationResult } = require('express-validator')
const { validateToken } = require('../Controllers/Auth/oauth')

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
