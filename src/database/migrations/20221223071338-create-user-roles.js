'use strict';
/** @type {import('sequelize-cli').Migration} */

const { ATTR_TABLE, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_INT_ROLE, ATTR_INT_USER } = require('../tableColumns/system/userroles');
const users = require('../tableColumns/system/users');
const roles = require('../tableColumns/system/roles');

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.createTable(ATTR_TABLE, {
        [ATTR_INT_USER]: {
          type: Sequelize.BIGINT,
          allowNull: false
        },
        [ATTR_INT_ROLE]: {
          type: Sequelize.BIGINT,
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
        fields: [ATTR_INT_ROLE, ATTR_INT_USER],
        type: 'unique',
        name: `uk_${ATTR_TABLE}`,
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
      }),
      await queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_ROLE],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_ROLE}_${roles.ATTR_TABLE}`,
        references: {
          table: roles.ATTR_TABLE,
          field: roles.ATTR_INT_ID
        },
        onDelete: 'NO ACTION'
      }),
      await queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_USER],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_USER}_${users.ATTR_TABLE}`,
        references: {
          table: users.ATTR_TABLE,
          field: roles.ATTR_INT_ID
        },
        onDelete: 'NO ACTION'
      })
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ATTR_TABLE);
  }
};