'use strict';
const {
  Model
} = require('sequelize');

const { ATTR_TABLE,
  ATTR_CHAR_OBJECT,
  ATTR_CHAR_DESCRIPTION,
  ATTR_INT_ID,
  ATTR_DATETIME_CREATED_AT,
  ATTR_DATETIME_UPDATED_AT,
  ATTR_INT_CREATED_BY,
  ATTR_INT_UPDATED_BY,
  ATTR_DATETIME_DELETED_AT } = require('../tableColumns/system/modules')

const users = require('../tableColumns/system/users')

module.exports = (sequelize, DataTypes) => {
  class Modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Modules.init({
    [ATTR_INT_ID]: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    [ATTR_CHAR_OBJECT]: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    [ATTR_CHAR_DESCRIPTION]: {
      type: DataTypes.STRING,
      allowNull: false
    },
    [ATTR_DATETIME_CREATED_AT]: DataTypes.DATE,
    [ATTR_DATETIME_UPDATED_AT]: DataTypes.DATE,
    [ATTR_INT_CREATED_BY]: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: users.ATTR_INT_ID
      }
    },
    [ATTR_INT_UPDATED_BY]: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: users.ATTR_INT_ID
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

  return Modules;
};