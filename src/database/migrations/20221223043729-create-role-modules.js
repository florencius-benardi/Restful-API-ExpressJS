'use strict';

const { ATTR_TABLE, ATTR_INT_ROLE, ATTR_INT_MODULE, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT } = require('../tableColumns/system/rolemodules');
const users = require('../tableColumns/system/users');
const modules = require('../tableColumns/system/modules');
const roles = require('../tableColumns/system/roles');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.createTable(ATTR_TABLE, {
        [ATTR_INT_ROLE]: {
          type: Sequelize.BIGINT,
          allowNull: false
        },
        [ATTR_INT_MODULE]: {
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
      }, {
        indexes: [
          {
            unique: true,
            fields: [ATTR_INT_ROLE, ATTR_INT_MODULE]
          }
        ],
      }).then(() => queryInterface.addConstraint(ATTR_TABLE, {
        fields: [ATTR_INT_ROLE, ATTR_INT_MODULE],
        type: 'unique',
        name: `uk_${ATTR_TABLE}`,
      })).then(() => queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_CREATED_BY],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_CREATED_BY}_${users.ATTR_TABLE}`,
        references: {
          table: users.ATTR_TABLE,
          field: users.ATTR_INT_ID
        },
        onDelete: 'SET NULL'
      })).then(() => queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_UPDATED_BY],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_UPDATED_BY}_${users.ATTR_TABLE}`,
        references: {
          table: users.ATTR_TABLE,
          field: users.ATTR_INT_ID
        },
        onDelete: 'SET NULL'
      })).then(() => queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_ROLE],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_ROLE}_${roles.ATTR_TABLE}`,
        references: {
          table: roles.ATTR_TABLE,
          field: roles.ATTR_INT_ID
        },
        onDelete: 'NO ACTION'
      })).then(() => queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_MODULE],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_MODULE}_${modules.ATTR_TABLE}`,
        references: {
          table: modules.ATTR_TABLE,
          field: modules.ATTR_INT_ID
        },
        onDelete: 'NO ACTION'
      }))
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ATTR_TABLE);
  }
};