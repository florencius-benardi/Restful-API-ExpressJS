'use strict';

const { Model } = require('sequelize');

const rolesFields = require('../tableColumns/system/roles')
const userFields = require('../tableColumns/system/users')

const {
  ATTR_TABLE,
  ATTR_CHAR_DESCRIPTION,
  ATTR_INT_ID,
  ATTR_DATETIME_CREATED_AT,
  ATTR_DATETIME_UPDATED_AT,
  ATTR_INT_CREATED_BY,
  ATTR_INT_UPDATED_BY,
  ATTR_DATETIME_DELETED_AT
} = rolesFields

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.User, { foreignKey: ATTR_INT_CREATED_BY, as: 'created_by' })
      // this.belongsTo(models.User, { foreignKey: ATTR_INT_UPDATED_BY, as: 'updated_by' })
    }
  }
  Role.init({
    [ATTR_CHAR_DESCRIPTION]: DataTypes.STRING,
    [ATTR_INT_ID]: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    [ATTR_DATETIME_CREATED_AT]: DataTypes.DATE,
    [ATTR_DATETIME_UPDATED_AT]: DataTypes.DATE,
    [ATTR_INT_CREATED_BY]: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: userFields.ATTR_INT_ID
      }
    },
    [ATTR_INT_UPDATED_BY]: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: userFields.ATTR_INT_ID
      }
    },
    [ATTR_DATETIME_DELETED_AT]: DataTypes.DATE
  }, {
    sequelize,
    underscored: true,
    modelName: ATTR_TABLE,
    timestamps: true,
    createdAt: ATTR_DATETIME_CREATED_AT,
    updatedAt: ATTR_DATETIME_UPDATED_AT,
    paranoid: true,
    deletedAt: ATTR_DATETIME_DELETED_AT,
  });

  return Role;
};