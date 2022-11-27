const readUser = require('../../../Repositories/Systems/User/ReadUser');

module.exports = {
    readAllUsers: async (req, res, next) => {
        const users = await readUser.readUsers()
        res.json(users)
    },
    readUser: async (req, res, next) => {
        // console.log(req.params.id)
        const { id } = req.params
        const users = await readUser.readUser(id)
        return res.json(users)
    }
}