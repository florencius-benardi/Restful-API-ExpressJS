'use strict';
/** @type {import('sequelize-cli').Migration} */

const userFields = require('../tableColumns/system/users')

const { ATTR_TABLE, ATTR_INT_UPDATED_BY, ATTR_INT_CREATED_BY, ATTR_INT_ID } = userFields

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_CREATED_BY],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_CREATED_BY}_${ATTR_TABLE}`,
        references: {
          table: ATTR_TABLE,
          field: ATTR_INT_ID
        },
        onDelete: 'set null'
      }),
      queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_UPDATED_BY],
        name: `fk_${ATTR_TABLE}_${ATTR_INT_UPDATED_BY}_${ATTR_TABLE}`,
        references: {
          table: ATTR_TABLE,
          field: ATTR_INT_ID
        },
        onDelete: 'set null'
      })
    ])
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint(ATTR_TABLE, `fk_${ATTR_TABLE}_${ATTR_INT_CREATED_BY}_${ATTR_TABLE}`)
    queryInterface.removeConstraint(ATTR_TABLE, `fk_${ATTR_TABLE}_${ATTR_INT_UPDATED_BY}_${ATTR_TABLE}`)
  }
};
