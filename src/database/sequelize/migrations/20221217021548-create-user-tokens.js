'use strict';
/** @type {import('sequelize-cli').Migration} */

const {
  ATTR_TABLE,
  ATTR_INT_ID,
  ATTR_CHAR_TYPE,
  ATTR_INT_USER,
  ATTR_CHAR_NAME,
  ATTR_JSON_ABILITIES,
  ATTR_CHAR_TOKEN,
  ATTR_DATETIME_LAST_USED_AT,
  ATTR_DATETIME_EXPIRED_AT,
  ATTR_DATETIME_CREATED_AT,
  ATTR_DATETIME_UPDATED_AT
} = require('../../tableColumns/system/usertokens')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ATTR_TABLE, {
      [ATTR_INT_ID]: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      [ATTR_CHAR_TYPE]: {
        type: Sequelize.STRING,
        allowNull: false
      },
      [ATTR_CHAR_NAME]: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      [ATTR_INT_USER]: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      [ATTR_CHAR_TOKEN]: {
        type: Sequelize.STRING,
        allowNull: false
      },
      [ATTR_JSON_ABILITIES]: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      [ATTR_DATETIME_EXPIRED_AT]: {
        type: Sequelize.DATE,
        allowNull: true
      },
      [ATTR_DATETIME_LAST_USED_AT]: {
        type: Sequelize.DATE,
        allowNull: true
      },
      [ATTR_DATETIME_CREATED_AT]: {
        type: Sequelize.DATE,
        allowNull: true
      },
      [ATTR_DATETIME_UPDATED_AT]: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ATTR_TABLE)
  }
};