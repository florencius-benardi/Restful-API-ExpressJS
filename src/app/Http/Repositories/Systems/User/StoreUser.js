const model = require('../../../../database/models/index');
const { ATTR_CHAR_USERNAME, ATTR_INT_ID } = require('../../../../database/tableColumns/system/users');

exports.updateUser = async (params, data) => {
    const users = await model.users.update(data, { where: params }, {
        multi: true
    }).then(function (res) {
        return res
    }).catch(function (error) {
        console.log(error);
        throw new Error(error);
    })
    return users
}

exports.storeUser = async (data) => {
    const result = await model.users.create(data, {
        returning: false,
        plain: true
    }).then(function (res) {
        return res
    }).catch(function (error) {
        console.log(error);
        throw new Error(error);
    });
    return result
}

exports.deleteUser = async (id) => {
    const users = await model.users.destroy({
        where: {
            [ATTR_INT_ID]: id
        }
    });
    return users
}