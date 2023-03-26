'use strict';

/** @type {import('sequelize-cli').Migration} */
const { now } = require('moment');

const { ATTR_TABLE,
  ATTR_CHAR_DESCRIPTION,
  ATTR_CHAR_OBJECT,
  ATTR_DATETIME_CREATED_AT,
  ATTR_DATETIME_UPDATED_AT
} = require('../tableColumns/system/modules')

module.exports = {
  async up(queryInterface, Sequelize) {
    let moduleList = [
      {
        [ATTR_CHAR_OBJECT]: 'MODULE-DISP',
        [ATTR_CHAR_DESCRIPTION]: 'View permission entire the system.',
        [ATTR_DATETIME_CREATED_AT]: new Date(now()),
        [ATTR_DATETIME_UPDATED_AT]: new Date(now())
      },
      {
        [ATTR_CHAR_OBJECT]: 'USER-CRTE',
        [ATTR_CHAR_DESCRIPTION]: 'Add a new user to the system.',
        [ATTR_DATETIME_CREATED_AT]: new Date(now()),
        [ATTR_DATETIME_UPDATED_AT]: new Date(now())
      },
      {
        [ATTR_CHAR_OBJECT]: 'USER-DISP',
        [ATTR_CHAR_DESCRIPTION]: 'View users data.',
        [ATTR_DATETIME_CREATED_AT]: new Date(now()),
        [ATTR_DATETIME_UPDATED_AT]: new Date(now())
      },
      {
        [ATTR_CHAR_OBJECT]: 'USER-UPDT',
        [ATTR_CHAR_DESCRIPTION]: 'View user data and allow to changes user data or user status.',
        [ATTR_DATETIME_CREATED_AT]: new Date(now()),
        [ATTR_DATETIME_UPDATED_AT]: new Date(now())
      },
      {
        [ATTR_CHAR_OBJECT]: 'USER-DELT',
        [ATTR_CHAR_DESCRIPTION]: 'Allow user to delete user.',
        [ATTR_DATETIME_CREATED_AT]: new Date(now()),
        [ATTR_DATETIME_UPDATED_AT]: new Date(now())
      },
      {
        [ATTR_CHAR_OBJECT]: 'ROLE-CRTE',
        [ATTR_CHAR_DESCRIPTION]: 'Add a new role to the system.',
        [ATTR_DATETIME_CREATED_AT]: new Date(now()),
        [ATTR_DATETIME_UPDATED_AT]: new Date(now())
      },
      {
        [ATTR_CHAR_OBJECT]: 'ROLE-DISP',
        [ATTR_CHAR_DESCRIPTION]: 'View roles data and view what permissions are given to the role.',
        [ATTR_DATETIME_CREATED_AT]: new Date(now()),
        [ATTR_DATETIME_UPDATED_AT]: new Date(now())
      },
      {
        [ATTR_CHAR_OBJECT]: 'ROLE-UPDT',
        [ATTR_CHAR_DESCRIPTION]: 'View role data and allow to changes permissions role.',
        [ATTR_DATETIME_CREATED_AT]: new Date(now()),
        [ATTR_DATETIME_UPDATED_AT]: new Date(now())
      },
      {
        [ATTR_CHAR_OBJECT]: 'ROLE-DELT',
        [ATTR_CHAR_DESCRIPTION]: 'Allow user to delete role.',
        [ATTR_DATETIME_CREATED_AT]: new Date(now()),
        [ATTR_DATETIME_UPDATED_AT]: new Date(now())
      },
    ]
    /**
     * Add seed commands here.
     */

    await queryInterface.bulkInsert(ATTR_TABLE, moduleList, { beforeCreate: true });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    return queryInterface.bulkDelete(ATTR_TABLE, null, { truncate: true, restartIdentity: true });
  }
};
