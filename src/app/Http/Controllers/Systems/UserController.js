const { responseJson } = require('../../../../config/response');
const { ATTR_INT_STATUS } = require('../../../../database/tableColumns/system/users');
const { decode } = require('../../../Helper/hashTransaction');
const readUser = require('../../Repositories/Systems/User/ReadUser');
const storeUser = require('../../Repositories/Systems/User/StoreUser');

module.exports = {
    readAllUsers: async (req, res, next) => {
        const users = await readUser.readUsers(req.params)
        res.json(users)
    },
    readUser: async (req, res, next) => {
        const { id } = req.params
        let decodeId = decode(id)
        const users = await readUser.readUser(decodeId)
        return responseJson(res, 200, 'Retreive data success', users)
    },
    storeUser: async (req, res, next) => {
        const data = req.body;
        try {
            delete data.password_confirmation;
            data[ATTR_INT_STATUS] = 0;
            await storeUser.storeUser(data);
            responseJson(res, 200, 'Create user successfully.', null)
            return;
        } catch (error) {
            return res.status(406).json(error)
        }
    },
    updateUser: async (req, res, next) => {
        const data = req.body;
        try {
            delete data.password_confirmation;
            await storeUser.updateUser(data);
            responseJson(res, 200, 'Create user successfully.', null)
            return;
        } catch (error) {
            return res.status(406).json(error)
        }
    },
    deleteUser: async (req, res, next) => {
        const { id } = req.params
        let decodeId = decode(id)
        try {
            await storeUser.deleteUser(decodeId);
            responseJson(res, 200, 'Delete user successfully.', null)
            return;
        } catch (error) {
            return res.status(406).json(error)
        }
    }
}