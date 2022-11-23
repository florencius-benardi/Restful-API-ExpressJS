'use strict';
const {
  DataTypes, Model
} = require('sequelize');

const sequelize = require('./index');

const userCol = require('../tableColumns/system/users')

module.exports = (sequelize, DataTypes) => {

  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    
  }

  const {
    ATTR_TABLE,
    ATTR_CHAR_FIRSTNAME,
    ATTR_CHAR_LASTNAME,
    ATTR_CHAR_USERNAME,
    ATTR_CHAR_EMAIL,
    ATTR_CHAR_PASSWORD,
    ATTR_CHAR_MOBILE,
    ATTR_INT_WRONG_PASS,
    ATTR_INT_STATUS,
    ATTR_CHAR_CONFIRMATION_CODE,
    ATTR_DATETIME_LAST_REQUEST_TIME,
    ATTR_CHAR_REMEMBER_TOKEN,
    ATTR_DATETIME_VERIFIED,
    ATTR_INT_ID,
    ATTR_DATETIME_CREATED_AT,
    ATTR_DATETIME_UPDATED_AT,
    ATTR_INT_CREATED_BY,
    ATTR_INT_UPDATED_BY,
    ATTR_DATETIME_DELETED_AT
  } = userCol

  Users.init({
    [ATTR_INT_ID]: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    [ATTR_CHAR_FIRSTNAME]: {
      type: DataTypes.STRING
    },
    [ATTR_CHAR_LASTNAME]: {
      type: DataTypes.STRING
    },
    [ATTR_CHAR_USERNAME]: {
      type: DataTypes.STRING
    },
    [ATTR_CHAR_EMAIL]: {
      type: DataTypes.STRING
    },
    [ATTR_CHAR_PASSWORD]: {
      type: DataTypes.STRING
    },
    [ATTR_CHAR_MOBILE]: {
      type: DataTypes.STRING
    },
    [ATTR_INT_WRONG_PASS]: {
      type: DataTypes.INTEGER
    },
    [ATTR_INT_STATUS]: {
      type: DataTypes.INTEGER
    },
    [ATTR_CHAR_CONFIRMATION_CODE]: {
      type: DataTypes.STRING
    },
    [ATTR_DATETIME_LAST_REQUEST_TIME]: {
      type: DataTypes.STRING
    },
    [ATTR_CHAR_REMEMBER_TOKEN]: {
      type: DataTypes.STRING
    },
    [ATTR_DATETIME_VERIFIED]: {
      type: DataTypes.STRING
    },
    [ATTR_DATETIME_CREATED_AT]: {
      type: DataTypes.DATE
    },
    [ATTR_DATETIME_UPDATED_AT]: {
      type: DataTypes.DATE
    },
    [ATTR_INT_CREATED_BY]: {
      type: DataTypes.INTEGER
    },
    [ATTR_INT_UPDATED_BY]: {
      type: DataTypes.INTEGER
    },
    [ATTR_DATETIME_DELETED_AT]: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: ATTR_TABLE,
  });
  return Users;
};