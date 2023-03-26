'use strict';
/** @type {import('sequelize-cli').Migration} */


const { ATTR_CHAR_TYPE, ATTR_INT_ID, ATTR_CHAR_NAME, ATTR_CHAR_VALUE, ATTR_TABLE, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_DATETIME_DELETED_AT, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY } = require('../tableColumns/system/setups')
const users = require('../tableColumns/system/users')

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.createTable(ATTR_TABLE,
        {
          [ATTR_INT_ID]: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          [ATTR_CHAR_NAME]: {
            type: Sequelize.STRING(100),
            unique: true
          },
          [ATTR_CHAR_VALUE]: {
            type: Sequelize.TEXT
          },
          [ATTR_CHAR_TYPE]: {
            type: Sequelize.STRING(100),
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