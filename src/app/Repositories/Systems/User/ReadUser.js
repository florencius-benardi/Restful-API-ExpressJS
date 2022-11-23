const model = require('../../../../database/models/index')

exports.readUsers = async () => {
    const users = await model.users.findAll();
    return users
}

exports.readUser = async (id) => {
    const users = await model.users.findByPk(id);
    return users
}

