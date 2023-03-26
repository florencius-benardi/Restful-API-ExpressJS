
const { validationResult } = require('express-validator')
const { createUserValidation, loginValidation, readUserValidation } = require('./System/UserValidation')

const validateBody = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty())
        return next()

    const extractedErrors = []
    for (let err of errors.array())
        extractedErrors.push({ [err.param]: err.msg })

    const error = new Error('Validation fail.');
    error.statusCode = 422;
    error.errors = extractedErrors;
    throw error;
}

module.exports = {
    validateBody,
    createUserValidation,
    readUserValidation,
    loginValidation
}
