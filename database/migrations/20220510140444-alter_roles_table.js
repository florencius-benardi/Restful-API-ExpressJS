'use strict';

const rolesCol = require('../tableColumns/system/rolesCol')
const usersCol = require('../tableColumns/system/usersCol')

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
        name: `fk_${ATTR_TABLE}_${ATTR_INT_CREATED_BY}_${usersCol.ATTR_TABLE}`,
        references: {
          table: usersCol.ATTR_TABLE,
          field: ATTR_INT_ID
        },
        onDelete: 'SET NULL'
      }),
      queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_UPDATED_BY],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_UPDATED_BY}_${usersCol.ATTR_TABLE}`,
        references: {
          table: usersCol.ATTR_TABLE,
          field: ATTR_INT_ID
        },
        onDelete: 'SET NULL'
      })
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
