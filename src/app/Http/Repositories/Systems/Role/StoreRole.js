const model = require('../../../../../database/models/index')
const { ATTR_INT_ID, ATTR_TABLE, ATTR_CHAR_DESCRIPTION } = require('../../../../../database/tableColumns/system/roles')
const Roles = model[ATTR_TABLE]

exports.updateRole = async (params, data, t) => {
    return await Roles.update(data, {
        where: params,
        transaction: t
    }).then(function (res) {
        return res
    }).catch(function (error) {
        throw new Error(error)
    })
}

exports.storeRole = async (data, t) => {
    return await Roles.findOne({
        where: {
            [ATTR_CHAR_DESCRIPTION]: data[ATTR_CHAR_DESCRIPTION]
        },
        paranoid: false
    }).then(async exists => {
        if (!exists) {
            return await Roles.create(data, {
                returning: false,
                plain: true,
                transaction: t
            }).then(function (res) {
                return res
            }).catch(function (error) {
                throw new Error(error)
            })
        } else {
            await exists.restore()
            return await exists.update(data)
        }
    }).catch(err => {
        throw new Error(err)
    })
}


exports.deleteRole = async (id, t) => {
    return await Roles.destroy({
        where: {
            [ATTR_INT_ID]: id
        },
        transaction: t
    })
}
