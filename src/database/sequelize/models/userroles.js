'use strict';
const {
  Model
} = require('sequelize')
const { ATTR_INT_USER, ATTR_INT_ROLE, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_INT_UPDATED_BY, ATTR_INT_CREATED_BY, ATTR_TABLE, ATTR_CHAR_ENCRYPT, ATTR_RELATION_CREATED_BY, ATTR_RELATION_UPDATED_BY, ATTR_INT_VERSION, ATTR_RELATION_ROLE, ATTR_RELATION_USER, ATTR_INT_ID, ATTR_RELATION_ROLEMODULE } = require('../../tableColumns/system/userroles')
const roles = require('../../tableColumns/system/roles')
const rolemodules = require('../../tableColumns/system/rolemodules')
const modules = require('../../tableColumns/system/modules')
const users = require('../../tableColumns/system/users')
const { encode } = require('../../app/Helper/hashTransaction')

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models[users.ATTR_TABLE], { foreignKey: ATTR_INT_CREATED_BY, as: ATTR_RELATION_CREATED_BY })
      this.belongsTo(models[users.ATTR_TABLE], { foreignKey: ATTR_INT_UPDATED_BY, as: ATTR_RELATION_UPDATED_BY })
      this.belongsTo(models[roles.ATTR_TABLE], { foreignKey: ATTR_INT_ROLE, as: ATTR_RELATION_ROLE })
      this.belongsTo(models[users.ATTR_TABLE], { foreignKey: ATTR_INT_USER, as: ATTR_RELATION_USER })
      this.hasMany(models[rolemodules.ATTR_TABLE], { foreignKey: ATTR_INT_ROLE, sourceKey: rolemodules.ATTR_INT_ROLE, as: ATTR_RELATION_ROLEMODULE })
    }
  }
  UserRoles.init({
    [ATTR_INT_ID]: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    [ATTR_INT_USER]: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      references: {
        model: roles.ATTR_TABLE,
        key: roles.ATTR_INT_ID
      }
    },
    [ATTR_INT_ROLE]: {
      type: DataTypes.BIGINT,
      references: {
        model: modules.ATTR_TABLE,
        key: modules.ATTR_INT_ID
      }
    },
    [ATTR_DATETIME_CREATED_AT]: {
      allowNull: true,
      type: DataTypes.DATE
    },
    [ATTR_DATETIME_UPDATED_AT]: {
      allowNull: true,
      type: DataTypes.DATE
    },
    [ATTR_INT_CREATED_BY]: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    [ATTR_INT_UPDATED_BY]: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    [ATTR_CHAR_ENCRYPT]: {
      type: DataTypes.VIRTUAL,
      get() {
        return encode(this[ATTR_INT_ID])
      }
    }
  }, {
    sequelize,
    underscored: true,
    modelName: ATTR_TABLE,
    timestamps: true,
    createdAt: ATTR_DATETIME_CREATED_AT,
    updatedAt: ATTR_DATETIME_UPDATED_AT,
    paranoid: false
  })

  return UserRoles;
};
