'use strict';

const model = require('../models/index')
const {
  ATTR_TABLE,
  ATTR_CHAR_USERNAME,
  ATTR_CHAR_EMAIL,
  ATTR_CHAR_PASSWORD,
  ATTR_CHAR_FIRSTNAME,
  ATTR_CHAR_LASTNAME,
  ATTR_INT_WRONG_PASS,
  ATTR_INT_STATUS,
  ATTR_DATETIME_VERIFIED,
  ATTR_DATETIME_CREATED_AT,
  ATTR_DATETIME_UPDATED_AT,
} = require('../../tableColumns/system/users')

const bcrypt = require('bcrypt')
const { now } = require('moment')
require('dotenv').config()

module.exports = {
  async up(queryInterface, Sequelize) {

    /**
     * Add seed commands here.
    */

    await model[ATTR_TABLE].findOne({
      where: {
        [ATTR_CHAR_USERNAME]: 'ADMINISTRATOR'
      }
    }).then(async (res) => {
      if (!res) {
        // const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT_ROUND))
        // const encryptedPass = bcrypt.hashSync(process.env.BCRYPT_DEFAULT_PASS, salt)
        await model[ATTR_TABLE].create({
          [ATTR_CHAR_USERNAME]: 'ADMINISTRATOR',
          [ATTR_CHAR_EMAIL]: 'admin@localhost.com',
          [ATTR_CHAR_PASSWORD]: process.env.BCRYPT_DEFAULT_PASS,
          [ATTR_CHAR_FIRSTNAME]: 'Administrator',
          [ATTR_CHAR_LASTNAME]: 'System',
          [ATTR_INT_WRONG_PASS]: 0,
          [ATTR_INT_STATUS]: 1,
          [ATTR_DATETIME_VERIFIED]: null,
          [ATTR_DATETIME_CREATED_AT]: new Date(now()),
          [ATTR_DATETIME_UPDATED_AT]: new Date(now()),
        })
      }
    })


  },

  async down(queryInterface, Sequelize) {

    /**
     * Add commands to revert seed here.
     */
    return queryInterface.bulkDelete(ATTR_TABLE, null, { truncate: true, restartIdentity: true })
  }
};
