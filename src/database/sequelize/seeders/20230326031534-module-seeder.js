'use strict';

/** @type {import('sequelize-cli').Migration} */

const model = require('../models/index')

const { ATTR_TABLE,
  ATTR_CHAR_DESCRIPTION,
  ATTR_CHAR_OBJECT
} = require('../../tableColumns/system/modules')

module.exports = {
  async up(queryInterface, Sequelize) {
    let moduleList = [
      { [ATTR_CHAR_OBJECT]: 'MODULE-DISP', [ATTR_CHAR_DESCRIPTION]: 'View permission entire the system.' },
      { [ATTR_CHAR_OBJECT]: 'USER-CRTE', [ATTR_CHAR_DESCRIPTION]: 'Add a new user to the system.' },
      { [ATTR_CHAR_OBJECT]: 'USER-DISP', [ATTR_CHAR_DESCRIPTION]: 'View users data.' },
      { [ATTR_CHAR_OBJECT]: 'USER-UPDT', [ATTR_CHAR_DESCRIPTION]: 'View user data and allow to changes user data or user status.' },
      { [ATTR_CHAR_OBJECT]: 'USER-DELT', [ATTR_CHAR_DESCRIPTION]: 'Allow user to delete users.' },
      { [ATTR_CHAR_OBJECT]: 'ROLE-CRTE', [ATTR_CHAR_DESCRIPTION]: 'Add a new role to the system.' },
      { [ATTR_CHAR_OBJECT]: 'ROLE-DISP', [ATTR_CHAR_DESCRIPTION]: 'View roles data and view what permissions are given to the role.' },
      { [ATTR_CHAR_OBJECT]: 'ROLE-UPDT', [ATTR_CHAR_DESCRIPTION]: 'View role data and allow to changes permissions role.' },
      { [ATTR_CHAR_OBJECT]: 'ROLE-DELT', [ATTR_CHAR_DESCRIPTION]: 'Allow user to delete role.' }
    ]
    /**
     * Add seed commands here.
     */

    for (let m of moduleList)
      await model[ATTR_TABLE].upsert(m)

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    return queryInterface.bulkDelete(ATTR_TABLE, null, { truncate: true, restartIdentity: true })
  }
};
