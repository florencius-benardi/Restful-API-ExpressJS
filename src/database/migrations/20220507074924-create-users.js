'use strict';
/** @type {import('sequelize-cli').Migration} */
const userFields = require('../tableColumns/system/users')

const {
  ATTR_TABLE,
  ATTR_CHAR_USERNAME,
  ATTR_CHAR_EMAIL,
  ATTR_CHAR_PASSWORD,
  ATTR_CHAR_MOBILE,
  ATTR_INT_MEMBER,
  ATTR_INT_WRONG_PASS,
  ATTR_INT_STATUS,
  ATTR_INT_TYPE,
  ATTR_CHAR_CONFIRMATION_CODE,
  ATTR_DATETIME_VERIFIED,
  ATTR_INT_ID,
  ATTR_DATETIME_CREATED_AT,
  ATTR_DATETIME_UPDATED_AT,
  ATTR_INT_CREATED_BY,
  ATTR_INT_UPDATED_BY,
  ATTR_DATETIME_DELETED_AT
} = userFields

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ATTR_TABLE, {
      [ATTR_INT_ID]: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      [ATTR_CHAR_USERNAME]: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      [ATTR_CHAR_EMAIL]: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true
      },
      [ATTR_CHAR_PASSWORD]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [ATTR_CHAR_MOBILE]: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      [ATTR_INT_WRONG_PASS]: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        default: 0
      },
      [ATTR_INT_STATUS]: {
        allowNull: true,
        type: Sequelize.SMALLINT,
      },
      [ATTR_INT_CREATED_BY]: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
      [ATTR_INT_UPDATED_BY]: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
      [ATTR_CHAR_CONFIRMATION_CODE]: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      [ATTR_DATETIME_CREATED_AT]: {
        allowNull: true,
        type: Sequelize.DATE
      },
      [ATTR_DATETIME_UPDATED_AT]: {
        allowNull: true,
        type: Sequelize.DATE
      },
      [ATTR_DATETIME_VERIFIED]: {
        allowNull: true,
        type: Sequelize.DATE
      },
      [ATTR_DATETIME_DELETED_AT]: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ATTR_TABLE);
  }
};