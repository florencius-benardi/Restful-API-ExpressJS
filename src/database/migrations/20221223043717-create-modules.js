'use strict';

const { ATTR_TABLE, ATTR_INT_ID, ATTR_CHAR_OBJECT, ATTR_CHAR_DESCRIPTION, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT } = require('../tableColumns/system/modules');
const users = require('../tableColumns/system/users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.createTable(ATTR_TABLE, {
        [ATTR_INT_ID]: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        [ATTR_CHAR_OBJECT]: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        [ATTR_CHAR_DESCRIPTION]: {
          type: Sequelize.STRING,
          allowNull: false
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
          allowNull: false,
          type: Sequelize.DATE
        },
        [ATTR_DATETIME_UPDATED_AT]: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      await queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_CREATED_BY],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_CREATED_BY}_${users.ATTR_TABLE}`,
        references: {
          table: users.ATTR_TABLE,
          field: users.ATTR_INT_ID
        },
        onDelete: 'SET NULL'
      }),
      await queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_UPDATED_BY],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_UPDATED_BY}_${users.ATTR_TABLE}`,
        references: {
          table: users.ATTR_TABLE,
          field: users.ATTR_INT_ID
        },
        onDelete: 'SET NULL'
      })
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ATTR_TABLE);
  }
};