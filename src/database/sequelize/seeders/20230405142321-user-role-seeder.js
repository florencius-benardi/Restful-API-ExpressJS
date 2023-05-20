'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ATTR_TABLE, ATTR_INT_ROLE, ATTR_INT_USER, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT } = require('../../tableColumns/system/userroles')
const users = require('../../tableColumns/system/users')
const roles = require('../../tableColumns/system/roles')

const model = require('../models/index')
const { now } = require('moment')

const Users = model[users.ATTR_TABLE]
const Roles = model[roles.ATTR_TABLE]
const UserRoles = model[ATTR_TABLE]

module.exports = {
  async up(queryInterface, Sequelize) {
    const resultUsers = await Users.findOne({
      raw: true,
      where: {
        [users.ATTR_CHAR_USERNAME]: 'ADMINISTRATOR'
      }
    })
    if (!resultUsers)
      throw new Error('User not found.')

    const resultRoles = await Roles.findOne({
      raw: true,
      where: {
        [roles.ATTR_CHAR_DESCRIPTION]: 'SYS-ADMIN'
      }
    })
    if (!resultRoles)
      throw new Error('Role not found.')

    await UserRoles.findOne({
      where: {
        [ATTR_INT_USER]: resultUsers[users.ATTR_INT_ID],
        [ATTR_INT_ROLE]: resultRoles[roles.ATTR_INT_ID],
      }
    }).then(async (result) => {
      if (!result) {
        await UserRoles.create({
          [ATTR_INT_USER]: resultUsers[users.ATTR_INT_ID],
          [ATTR_INT_ROLE]: resultRoles[roles.ATTR_INT_ID],
          [ATTR_DATETIME_CREATED_AT]: new Date(now()),
          [ATTR_DATETIME_UPDATED_AT]: new Date(now()),
        })
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {})
     */
  }
};
