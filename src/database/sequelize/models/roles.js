'use strict';
const {
  Model
} = require('sequelize')

const {
  ATTR_TABLE,
  ATTR_CHAR_DESCRIPTION,
  ATTR_INT_ID,
  ATTR_DATETIME_CREATED_AT,
  ATTR_DATETIME_UPDATED_AT,
  ATTR_RELATION_UPDATED_BY,
  ATTR_RELATION_CREATED_BY,
  ATTR_INT_CREATED_BY,
  ATTR_INT_UPDATED_BY,
  ATTR_DATETIME_DELETED_AT,
  ATTR_CHAR_ENCRYPT,
  ATTR_INT_VERSION,
  ATTR_RELATION_MODULES,
  ATTR_RELATION_ORGANIZATION
} = require('../../tableColumns/system/roles')

const users = require('../../tableColumns/system/users')
const rolemodules = require('../../tableColumns/system/rolemodules')
const roleorganization = require('../../tableColumns/system/roleorganization')
const { encode } = require('../../app/Helper/hashTransaction')

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models[users.ATTR_TABLE], { foreignKey: ATTR_INT_CREATED_BY, as: ATTR_RELATION_CREATED_BY })
      this.belongsTo(models[users.ATTR_TABLE], { foreignKey: ATTR_INT_UPDATED_BY, as: ATTR_RELATION_UPDATED_BY })
      this.hasMany(models[rolemodules.ATTR_TABLE], { foreignKey: rolemodules.ATTR_INT_ROLE, as: ATTR_RELATION_MODULES, required: true })
      this.hasMany(models[roleorganization.ATTR_TABLE], { foreignKey: roleorganization.ATTR_INT_ROLE, as: ATTR_RELATION_ORGANIZATION })
    }
  }
  Roles.init({
    [ATTR_INT_ID]: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    [ATTR_CHAR_DESCRIPTION]: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        args: true,
        msg: 'The Role Name is already taken!'
      },
      validate: {
        notNull: {
          args: ATTR_CHAR_DESCRIPTION,
          msg: 'Please enter the Role Name.'
        }
      },
    },
    [ATTR_INT_CREATED_BY]: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    [ATTR_INT_UPDATED_BY]: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    [ATTR_DATETIME_CREATED_AT]: {
      allowNull: true,
      type: DataTypes.DATE
    },
    [ATTR_DATETIME_UPDATED_AT]: {
      allowNull: true,
      type: DataTypes.DATE
    },
    [ATTR_DATETIME_DELETED_AT]: {
      allowNull: true,
      type: DataTypes.DATE
    },
    [ATTR_INT_VERSION]: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
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
    version: true,
    modelName: ATTR_TABLE,
    timestamps: true,
    createdAt: ATTR_DATETIME_CREATED_AT,
    updatedAt: ATTR_DATETIME_UPDATED_AT,
    paranoid: true,
    deletedAt: ATTR_DATETIME_DELETED_AT,
  })

  return Roles;
};
