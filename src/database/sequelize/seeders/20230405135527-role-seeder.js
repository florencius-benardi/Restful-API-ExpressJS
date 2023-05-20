'use strict';

const { now } = require('moment')
/** @type {import('sequelize-cli').Migration} */

const model = require('../models/index')
const {
  ATTR_TABLE,
  ATTR_CHAR_DESCRIPTION,
  ATTR_DATETIME_CREATED_AT,
  ATTR_DATETIME_UPDATED_AT
} = require('../../../tableColumns/system/roles')

const Roles = model[ATTR_TABLE]

module.exports = {
  async up(queryInterface, Sequelize) {
    await Roles.findOne({
      where: {
        [ATTR_CHAR_DESCRIPTION]: 'SYS-ADMIN'
      }
    }).then(async (res) => {
      if (!res) {
        await Roles.create({
          [ATTR_CHAR_DESCRIPTION]: 'SYS-ADMIN',
          [ATTR_DATETIME_CREATED_AT]: new Date(now()),
          [ATTR_DATETIME_UPDATED_AT]: new Date(now()),
        })
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(ATTR_TABLE, null, { truncate: true, restartIdentity: true })
  }
};
