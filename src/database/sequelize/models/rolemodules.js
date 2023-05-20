'use strict';
const {
  Model
} = require('sequelize')

const {
  ATTR_TABLE, ATTR_INT_ROLE, ATTR_INT_MODULE, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_RELATION_CREATED_BY, ATTR_RELATION_UPDATED_BY, ATTR_RELATION_MODULE, ATTR_RELATION_ROLE, ATTR_INT_ID
} = require('../tableColumns/system/rolemodules')

const roles = require('../tableColumns/system/roles')
const modules = require('../tableColumns/system/modules')
const users = require('../tableColumns/system/users')

module.exports = (sequelize, DataTypes) => {
  class RoleModules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models[users.ATTR_TABLE], { foreignKey: ATTR_INT_CREATED_BY, as: ATTR_RELATION_CREATED_BY })
      this.belongsTo(models[users.ATTR_TABLE], { foreignKey: ATTR_INT_UPDATED_BY, as: ATTR_RELATION_UPDATED_BY })
      this.belongsTo(models[modules.ATTR_TABLE], { foreignKey: ATTR_INT_MODULE, as: ATTR_RELATION_MODULE })
      this.belongsTo(models[roles.ATTR_TABLE], { foreignKey: ATTR_INT_ROLE, targetKey: roles.ATTR_INT_ID, as: ATTR_RELATION_ROLE })
    }
  }

  RoleModules.init({
    [ATTR_INT_ID]: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    [ATTR_INT_ROLE]: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: roles.ATTR_TABLE,
        key: roles.ATTR_INT_ID
      }
    },
    [ATTR_INT_MODULE]: {
      type: DataTypes.BIGINT,
      allowNull: false,
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
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: ATTR_TABLE,
    timestamps: true,
    createdAt: ATTR_DATETIME_CREATED_AT,
    updatedAt: ATTR_DATETIME_UPDATED_AT,
    paranoid: false
  })
  return RoleModules;
};
