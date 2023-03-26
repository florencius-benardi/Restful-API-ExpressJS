
const { ATTR_INT_ID, ATTR_INT_WRONG_PASS, ATTR_CHAR_PASSWORD, ATTR_DATETIME_LAST_REQUEST_TIME, ATTR_CHAR_CONFIRMATION_CODE, ATTR_DATETIME_VERIFIED } = require('../../../../database/tableColumns/system/users');
const { updateUser } = require('../../Repositories/Systems/User/StoreUser');
const { generateToken, revokeToken } = require('./oauth');

module.exports = {
    login: async (req, res, next) => {
        let data = req.body.user_data

        let excludes = [
            ATTR_CHAR_PASSWORD,
            ATTR_DATETIME_LAST_REQUEST_TIME,
            ATTR_CHAR_CONFIRMATION_CODE,
            ATTR_INT_WRONG_PASS,
            ATTR_DATETIME_VERIFIED
        ]

        for (let exclude of excludes)
            delete data[exclude]

        let token = await generateToken(req.body.user_data[ATTR_INT_ID]);
        let result = await updateUser(
            { [ATTR_INT_ID]: parseInt(req.body.user_data[ATTR_INT_ID]) },
            {
                [ATTR_INT_WRONG_PASS]: 0
            },
        );

        return res.status(200).json({
            status: true,
            message: 'Login Success',
            data: { ...data, token, result }
        });
    },
    logout: async (req, res, next) => {
        await revokeToken(req.headers.authorization);
        return res.status(200).json({
            status: true,
            message: 'Logout Success'
        });
    },
}