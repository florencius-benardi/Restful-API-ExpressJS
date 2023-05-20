const moment = require('moment')
const { ATTR_CHAR_TYPE, ATTR_DATETIME_EXPIRED_AT, ATTR_JSON_ABILITIES, ATTR_CHAR_NAME, ATTR_INT_USER, ATTR_CHAR_TOKEN, ATTR_INT_ID } = require('../../../../database/tableColumns/system/usertokens')
const merchants = require('../../../../database/tableColumns/master/merchants')
const { validateTokenUser } = require('../../Repositories/Systems/PersonalAccessToken/ReadToken')
const { createUserToken, revokeUserToken, setUserTokenAccess } = require('../../Repositories/Systems/PersonalAccessToken/StoreToken')
const { randString } = require('../../../Helper/randomString')

module.exports = {
    generateToken: async (id) => {
        let token = await randString(64)
        let expiryTime = moment().add(7, 'days')
        let tokenAccess = await createUserToken({
            [ATTR_CHAR_TYPE]: 'user',
            [ATTR_CHAR_NAME]: 'access-user-token',
            [ATTR_INT_USER]: id,
            [ATTR_CHAR_TOKEN]: token,
            [ATTR_DATETIME_EXPIRED_AT]: expiryTime,
            [ATTR_JSON_ABILITIES]: null,
        })
        return tokenAccess;
    },
    validateToken: async (token) => {
        let result = token.replace('Bearer ', '').split('|')
        return await validateTokenUser({
            [ATTR_INT_ID]: result[0],
            [ATTR_CHAR_TOKEN]: result[1],
            [ATTR_CHAR_TYPE]: 'user',
        })
    },
    validateTokenMerchant: async (token) => {
        let result = token.replace('Bearer ', '').split('|')
        return await validateTokenUser({
            [merchants.ATTR_INT_ID]: result[0],
            [merchants.ATTR_CHAR_TOKEN]: result[1]
        })
    },
    setAccessToken: async (data, permissions) => {
        let token = data.replace('Bearer ', '').split('|')
        return await setUserTokenAccess({
            [ATTR_INT_ID]: token[0],
            [ATTR_CHAR_TOKEN]: token[1],
            [ATTR_CHAR_TYPE]: 'user',
        }, permissions)
    },
    getAccessToken: () => { },
    revokeToken: async (data) => {
        let token = data.replace('Bearer ', '').split('|')
        return await revokeUserToken({
            [ATTR_INT_ID]: token[0],
            [ATTR_CHAR_TOKEN]: token[1],
            [ATTR_CHAR_TYPE]: 'user',
        })
    }
}