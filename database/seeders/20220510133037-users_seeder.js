'use strict';

const userCol = require('../tableColumns/system/usersCol')
const bcrypt = require('bcrypt');
const { now } = require('moment');
require('dotenv').config();

const { ATTR_TABLE,
  ATTR_CHAR_FIRSTNAME,
  ATTR_CHAR_LASTNAME,
  ATTR_CHAR_USERNAME,
  ATTR_CHAR_EMAIL,
  ATTR_CHAR_PASSWORD,
  ATTR_CHAR_MOBILE,
  ATTR_INT_WRONG_PASS,
  ATTR_INT_STATUS,
  ATTR_CHAR_CONFIRMATION_CODE,
  ATTR_DATETIME_LAST_REQUEST_TIME,
  ATTR_CHAR_REMEMBER_TOKEN,
  ATTR_DATETIME_VERIFIED,
  ATTR_INT_ID,
  ATTR_DATETIME_CREATED_AT,
  ATTR_DATETIME_UPDATED_AT,
  ATTR_INT_CREATED_BY,
  ATTR_INT_UPDATED_BY,
  ATTR_DATETIME_DELETED_AT } = userCol

module.exports = {
  async up(queryInterface, Sequelize) {

    /**
     * Add seed commands here.
    */

    const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT_ROUND))
    const encrypt_pass = bcrypt.hashSync(process.env.BCRYPT_DEFAULT_PASS, salt);

    await queryInterface.bulkInsert(ATTR_TABLE, [{
      [ATTR_CHAR_FIRSTNAME]: 'SYSTEM',
      [ATTR_CHAR_LASTNAME]: 'ADMINISTRATOR',
      [ATTR_CHAR_USERNAME]: 'ADMINISTRATOR',
      [ATTR_CHAR_EMAIL]: 'admin@localhost.com',
      [ATTR_CHAR_PASSWORD]: encrypt_pass,
      [ATTR_CHAR_MOBILE]: '62121313712',
      [ATTR_INT_WRONG_PASS]: 0,
      [ATTR_INT_STATUS]: 0,
      [ATTR_DATETIME_VERIFIED]: null,
      [ATTR_DATETIME_CREATED_AT]: new Date(now()),
      [ATTR_DATETIME_UPDATED_AT]: new Date(now()),
      [ATTR_INT_CREATED_BY]: null,
      [ATTR_INT_UPDATED_BY]: null,
      [ATTR_DATETIME_DELETED_AT]: null,
    }], {});

  },

  async down(queryInterface, Sequelize) {
    
    /**
     * Add commands to revert seed here.
     */

     return queryInterface.bulkDelete(ATTR_TABLE, null, {});
  }
};
