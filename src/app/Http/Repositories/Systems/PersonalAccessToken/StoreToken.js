const model = require('../../../../../database/models/index');
const { ATTR_INT_ID, ATTR_CHAR_TOKEN, ATTR_TABLE } = require('../../../../../database/tableColumns/system/usertokens');

exports.createUserToken = async (data) => {
    const result = await model[ATTR_TABLE].create(data, {
        raw: true,
    }).then(function (res) {
        return `${res[ATTR_INT_ID]}|${res[ATTR_CHAR_TOKEN]}`
    }).catch(function (error) {
        console.log(error);
        throw new Error(error);
    });
    return result
}

exports.revokeUserToken = async (params) => {
    const result = await model[ATTR_TABLE].findOne({ raw: true, where: params })
        .then(async function (res) {
            if (res) {
                const result = await model[ATTR_TABLE].destroy({
                    where: {
                        [ATTR_INT_ID]: res[ATTR_INT_ID]
                    }
                });
                return result
            }
        }).catch(function (error) {
            console.log(error);
            throw new Error(error);
        })
    return result
}