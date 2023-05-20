'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ATTR_TABLE, ATTR_INT_ID } = require('../../tableColumns/system/modules')
const roleModules = require('../../tableColumns/system/rolemodules')
const roles = require('../../tableColumns/system/roles')

const model = require('../models/index')
const { now } = require('moment')

const Modules = model[ATTR_TABLE]
const RoleModules = model[roleModules.ATTR_TABLE]
const Roles = model[roles.ATTR_TABLE]

module.exports = {
  async up(queryInterface, Sequelize) {
    const resultRoles = await Roles.findOne({
      raw: true,
      where: {
        [roles.ATTR_CHAR_DESCRIPTION]: 'SYS-ADMIN'
      }
    })

    if (!resultRoles)
      throw new Error('Roles not found.')

    const resultModules = await Modules.findAll({
      raw: true,
      order: [
        [ATTR_INT_ID, 'ASC']
      ]
    })

    if (resultModules.length > 0)
      for (let res of resultModules) {
        await RoleModules.findOne({
          where: {
            [roleModules.ATTR_INT_ROLE]: resultRoles[ATTR_INT_ID],
            [roleModules.ATTR_INT_MODULE]: res[ATTR_INT_ID],
          }
        }).then(async (result) => {
          if (!result) {
            await RoleModules.create({
              [roleModules.ATTR_INT_ROLE]: resultRoles[ATTR_INT_ID],
              [roleModules.ATTR_INT_MODULE]: res[ATTR_INT_ID],
              [roleModules.ATTR_DATETIME_CREATED_AT]: new Date(now()),
              [roleModules.ATTR_DATETIME_UPDATED_AT]: new Date(now()),
            })
          }
        })
      }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(roleModules.ATTR_TABLE, null, { truncate: true, restartIdentity: true })
  }
};
