'use strict';
/** @type {import('sequelize-cli').Migration} */

const { ATTR_TABLE, ATTR_INT_TRANSACTION_CODE, ATTR_CHAR_LAST_NO, ATTR_INT_LAST_NO, ATTR_INT_ID, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_DATETIME_DELETED_AT, ATTR_INT_SEQUENCE, ATTR_DATE_START_EFFECTIVE, ATTR_DATE_END_EFFECTIVE } = require('../tableColumns/system/transactioncodedetails');
const users = require('../tableColumns/system/users');
const transactionCodes = require('../tableColumns/system/transactioncodes');

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.createTable(ATTR_TABLE,
        {
          [ATTR_INT_ID]: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          [ATTR_INT_TRANSACTION_CODE]: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          [ATTR_INT_SEQUENCE]: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          [ATTR_CHAR_LAST_NO]: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          [ATTR_INT_LAST_NO]: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          [ATTR_DATE_START_EFFECTIVE]: {
            allowNull: true,
            type: Sequelize.DATE
          },
          [ATTR_DATE_END_EFFECTIVE]: {
            allowNull: true,
            type: Sequelize.DATE
          },
          [ATTR_INT_CREATED_BY]: {
            allowNull: true,
            type: Sequelize.BIGINT
          },
          [ATTR_INT_UPDATED_BY]: {
            allowNull: true,
            type: Sequelize.BIGINT
          },
          [ATTR_DATETIME_CREATED_AT]: {
            allowNull: true,
            type: Sequelize.DATE
          },
          [ATTR_DATETIME_UPDATED_AT]: {
            allowNull: true,
            type: Sequelize.DATE
          },
          [ATTR_DATETIME_DELETED_AT]: {
            allowNull: true,
            type: Sequelize.DATE
          }
        }),
      queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_TRANSACTION_CODE],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_TRANSACTION_CODE}_${transactionCodes.ATTR_TABLE}`,
        references: {
          table: transactionCodes.ATTR_TABLE,
          field: transactionCodes.ATTR_INT_ID
        },
        onDelete: 'NO ACTION'
      }),
      queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_CREATED_BY],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_CREATED_BY}_${users.ATTR_TABLE}`,
        references: {
          table: users.ATTR_TABLE,
          field: users.ATTR_INT_ID
        },
        onDelete: 'SET NULL'
      }),
      queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_UPDATED_BY],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_UPDATED_BY}_${users.ATTR_TABLE}`,
        references: {
          table: users.ATTR_TABLE,
          field: users.ATTR_INT_ID
        },
        onDelete: 'SET NULL'
      })
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ATTR_TABLE);
  }
};