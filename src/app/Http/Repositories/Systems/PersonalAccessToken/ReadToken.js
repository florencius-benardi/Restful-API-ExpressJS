const model = require('../../../../../database/sequelize/models/index')
const { ATTR_TABLE } = require('../../../../../database/tableColumns/system/usertokens')

exports.validateTokenUser = async (params) => {
    return await model[ATTR_TABLE].findOne({ where: params }).then(function (res) {
        return res
    }).catch(function (error) {
        throw new Error(error)
    })
}