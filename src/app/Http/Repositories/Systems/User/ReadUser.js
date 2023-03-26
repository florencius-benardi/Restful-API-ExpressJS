const model = require('../../../../../database/models/index');
const { ATTR_RELATION_UPDATED_BY, ATTR_RELATION_CREATED_BY } = require('../../../../../database/tableColumns/system/users');

exports.readUsers = async () => {
    const users = await model.users.findAndCountAll({
        include: [ATTR_RELATION_CREATED_BY, ATTR_RELATION_UPDATED_BY]
    });
    return users
}

exports.readUser = async (id) => {
    const users = await model.users.findByPk(id);
    return users
}

exports.validateFieldUser = async (field, param, scope) => {

    if (scope) {
        return await model.users.findOne({
            raw: true,
            where: { [field]: param }
        }).then(exists => {
            return exists;
        }).catch(err => {
            throw err;
        });
    }
    else
        return await model.users.unscoped().findOne({
            raw: true,
            where: { [field]: param }
        }).then(exists => {
            return exists;
        }).catch(err => {
            throw err;
        });
}
