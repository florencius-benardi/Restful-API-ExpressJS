'use strict';
/** @type {import('sequelize-cli').Migration} */

const rolesCol = require('../tableColumns/system/roles')
const users = require('../tableColumns/system/users')

const { ATTR_TABLE,
  ATTR_INT_ID,
  ATTR_INT_CREATED_BY,
  ATTR_INT_UPDATED_BY } = rolesCol

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */

    return Promise.all([
      queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_CREATED_BY],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_CREATED_BY}_${users.ATTR_TABLE}`,
        references: {
          table: users.ATTR_TABLE,
          field: ATTR_INT_ID
        },
        onDelete: 'SET NULL'
      }),
      queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_UPDATED_BY],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_UPDATED_BY}_${users.ATTR_TABLE}`,
        references: {
          table: users.ATTR_TABLE,
          field: ATTR_INT_ID
        },
        onDelete: 'SET NULL'
      })
    ])
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint(ATTR_TABLE, `fk_${ATTR_TABLE}_${ATTR_INT_CREATED_BY}_${ATTR_TABLE}`)
    queryInterface.removeConstraint(ATTR_TABLE, `fk_${ATTR_TABLE}_${ATTR_INT_UPDATED_BY}_${ATTR_TABLE}`)
  }
};
