const model = require('../../../../../database/sequelize/models/index')
const { ATTR_INT_ID, ATTR_CHAR_TOKEN, ATTR_TABLE, ATTR_JSON_ABILITIES } = require('../../../../../database/tableColumns/system/usertokens')
const UserToken = model[ATTR_TABLE]

exports.createUserToken = async (data) => {
  return await UserToken.create(data).then(function (res) {
    return `${res[ATTR_INT_ID]}|${res[ATTR_CHAR_TOKEN]}`
  }).catch(function (error) {
    throw new Error(error)
  })
}

exports.setUserTokenAccess = async (params, permissions) => {
  return await UserToken.update({
    [ATTR_JSON_ABILITIES]: permissions
  }, {
    where: params
  }).then(function (res) {
    return res
  }).catch(function (error) {
    throw new Error(error)
  })
}

exports.revokeUserToken = async (params) => {
  return await UserToken.findOne({ raw: true, where: params })
    .then(async function (res) {
      if (res) {
        const result = await UserToken.destroy({
          where: {
            [ATTR_INT_ID]: res[ATTR_INT_ID]
          }
        })
        return result
      }
    }).catch(function (error) {
      throw new Error(error)
    })
}
