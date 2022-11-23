'use strict';
/** @type {import('sequelize-cli').Migration} */

const rolesCol = require('../tableColumns/system/roles')

const { ATTR_TABLE,
  ATTR_CHAR_DESCRIPTION,
  ATTR_INT_ID,
  ATTR_DATETIME_CREATED_AT,
  ATTR_DATETIME_UPDATED_AT,
  ATTR_INT_CREATED_BY,
  ATTR_INT_UPDATED_BY,
  ATTR_DATETIME_DELETED_AT } = rolesCol

module.exports = {
  async up(queryInterface, Sequelize) {
    await  queryInterface.createTable(ATTR_TABLE, {
        [ATTR_INT_ID]: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        [ATTR_CHAR_DESCRIPTION]: {
          type: Sequelize.STRING(50)
        },
        [ATTR_INT_CREATED_BY]: {
          allowNull: true,
          type: Sequelize.BIGINT,
        },
        [ATTR_INT_UPDATED_BY]: {
          allowNull: true,
          type: Sequelize.BIGINT,
        },
        [ATTR_DATETIME_CREATED_AT]: {
          allowNull: false,
          type: Sequelize.DATE
        },
        [ATTR_DATETIME_UPDATED_AT]: {
          allowNull: false,
          type: Sequelize.DATE
        },
        [ATTR_DATETIME_DELETED_AT]: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ATTR_TABLE);
  }
};