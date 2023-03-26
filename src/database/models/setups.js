'use strict';
const {
  Model
} = require('sequelize');

const { ATTR_CHAR_TYPE, ATTR_INT_ID, ATTR_CHAR_NAME, ATTR_CHAR_VALUE, ATTR_TABLE, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_DATETIME_DELETED_AT, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY } = require('../tableColumns/system/setups')
const userFields = require('../tableColumns/system/users')

module.exports = (sequelize, DataTypes) => {
  class Setups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Setups.init({
    [ATTR_INT_ID]: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    [ATTR_CHAR_NAME]: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    [ATTR_CHAR_VALUE]: {
      type: DataTypes.TEXT
    },
    [ATTR_CHAR_TYPE]: {
      type: DataTypes.STRING(50)
    },
    [ATTR_DATETIME_CREATED_AT]: DataTypes.DATE,
    [ATTR_DATETIME_UPDATED_AT]: DataTypes.DATE,
    [ATTR_INT_CREATED_BY]: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: userFields.ATTR_INT_ID
      }
    },
    [ATTR_INT_UPDATED_BY]: {
      type: DataTypes.BIGINT,
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

  return Setups;
};