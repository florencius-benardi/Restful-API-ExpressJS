'use strict';

const usermodel = require('../tableColumns/usersCol')

const { ATTR_TABLE, ATTR_INT_UPDATED_BY, ATTR_INT_CREATED_BY, ATTR_INT_ID } = usermodel

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_CREATED_BY],
        name: `fk_${ATTR_INT_CREATED_BY}_${ATTR_TABLE}`,
        references: {
          table: ATTR_TABLE,
          field: ATTR_INT_ID
        },
        onDelete: 'set null'
      }),
      queryInterface.addConstraint(ATTR_TABLE, {
        type: 'FOREIGN KEY',
        fields: [ATTR_INT_UPDATED_BY],
        name: `fk_${ATTR_INT_UPDATED_BY}_${ATTR_TABLE}`,
        references: {
          table: ATTR_TABLE,
          field: ATTR_INT_ID
        },
        onDelete: 'set null'
      })
    ])
  },

  async down(queryInterface, Sequelize) {

  }
};
