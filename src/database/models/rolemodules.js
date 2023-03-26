'use strict';
const {
  Model
} = require('sequelize');

const {
  ATTR_TABLE, ATTR_INT_ROLE, ATTR_INT_MODULE, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_DATETIME_DELETED_AT
} = require('../tableColumns/system/rolemodules');
const rolesField = require('../tableColumns/system/roles');
const moduleField = require('../tableColumns/system/modules');
const users = require('../tableColumns/system/users')

module.exports = (sequelize, DataTypes) => {
  class RoleModules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  RoleModules.init({
    [ATTR_INT_ROLE]: {
      type: DataTypes.BIGINT,
      references: {
        model: 'roles',
        key: rolesField.ATTR_INT_ID
      }
    },
    [ATTR_INT_MODULE]: {
      type: DataTypes.BIGINT,
      references: {
        model: 'modules',
        key: moduleField.ATTR_INT_ID
      }
    },
    [ATTR_DATETIME_CREATED_AT]: DataTypes.DATE,
    [ATTR_DATETIME_UPDATED_AT]: DataTypes.DATE,
    [ATTR_INT_CREATED_BY]: {
      type: DataTypes.BIGINT,
      references: {
        model: users.ATTR_TABLE,
        key: users.ATTR_INT_ID
      }
    },
    [ATTR_INT_UPDATED_BY]: {
      type: DataTypes.BIGINT,
      references: {
        model: users.ATTR_TABLE,
        key: users.ATTR_INT_ID
      }
    },
  }, {
    sequelize,
    underscored: true,
    modelName: ATTR_TABLE,
    timestamps: true,
    createdAt: ATTR_DATETIME_CREATED_AT,
    updatedAt: ATTR_DATETIME_UPDATED_AT,
    paranoid: false
  });
  return RoleModules;
};