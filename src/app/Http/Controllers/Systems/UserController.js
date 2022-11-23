const readUser = require('../../../Repositories/Systems/User/ReadUser');

exports.readAllUsers = async (req, res, next) => {
    const users = await readUser.findAll()
    res.json(users)
};

exports.readUser = async (req, res, next) => {
    // console.log(req.params.id)
    const { id } = req.params
    const users = await readUser.readUser(id)
    return res.json(users)
    res.json(true)
};