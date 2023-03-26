'use strict';
/** @type {import('sequelize-cli').Migration} */

const { ATTR_TABLE, ATTR_CHAR_FORMAT, ATTR_CHAR_MODULE, ATTR_CHAR_CODE, ATTR_CHAR_LAST_NO, ATTR_INT_LAST_NO, ATTR_INT_ID, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_DATETIME_DELETED_AT } = require('../tableColumns/system/transactioncodes');
const users = require('../tableColumns/system/users');

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
          [ATTR_CHAR_CODE]: {
            type: Sequelize.STRING(20),
            unique: true,
            allowNull: false,
          },
          [ATTR_CHAR_FORMAT]: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          [ATTR_CHAR_MODULE]: {
            type: Sequelize.STRING(50),
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