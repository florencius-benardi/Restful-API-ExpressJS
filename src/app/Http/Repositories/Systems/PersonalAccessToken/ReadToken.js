const model = require('../../../../database/models/index');
const { ATTR_INT_ID, ATTR_CHAR_TOKEN, ATTR_TABLE } = require('../../../../database/tableColumns/system/usertokens');

exports.validateTokenUser = async (params) => {
    const result = await model[ATTR_TABLE].findOne({ raw: true, where: params }).then(function (res) {
        return res
    }).catch(function (error) {
        console.log(error);
        throw new Error(error);
    })
    return result
}