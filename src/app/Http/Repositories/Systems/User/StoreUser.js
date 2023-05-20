const model = require('../../../../../database/sequelize/models/index')
const { ATTR_INT_ID, ATTR_TABLE } = require('../../../../../database/tableColumns/system/users')

const Users = model[ATTR_TABLE]

exports.updateUser = async (params, data, t) => {
    return await Users.update(data, {
        where: params,
        transaction: t
    })
        .then(function (res) {
            return res
        }).catch(function (error) {
            throw new Error(error)
        })
}

exports.storeUser = async (data, t) => {
    return await Users.create(data, {
        returning: true,
        plain: true,
        transaction: t
    }).then(function (res) {
        return res
    }).catch(function (error) {
        throw new Error(error)
    })
}

exports.deleteUser = async (id, t) => {
    return await Users.destroy({
        where: {
            [ATTR_INT_ID]: id
        },
        transaction: t
    })
}
