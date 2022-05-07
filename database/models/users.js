'use strict';
const {
  Model
} = require('sequelize');

const userCol = require('../tableColumns/usersCol')

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
    [ATTR_CHAR_FIRSTNAME]: DataTypes.STRING,
    [ATTR_CHAR_LASTNAME]: DataTypes.STRING,
    [ATTR_CHAR_USERNAME]: DataTypes.STRING,
    [ATTR_CHAR_EMAIL]: DataTypes.STRING,
    [ATTR_CHAR_PASSWORD]: DataTypes.STRING,
    [ATTR_CHAR_MOBILE]: DataTypes.STRING,
    [ATTR_INT_WRONG_PASS]: DataTypes.INTEGER,
    [ATTR_INT_STATUS]: DataTypes.INTEGER,
    [ATTR_CHAR_CONFIRMATION_CODE]: DataTypes.STRING,
    [ATTR_DATETIME_LAST_REQUEST_TIME]: DataTypes.STRING,
    [ATTR_CHAR_REMEMBER_TOKEN]: DataTypes.STRING,
    [ATTR_DATETIME_VERIFIED]: DataTypes.STRING,
    [ATTR_INT_ID]: DataTypes.INTEGER,
    [ATTR_DATETIME_CREATED_AT]: DataTypes.DATE,
    [ATTR_DATETIME_UPDATED_AT]: DataTypes.DATE,
    [ATTR_INT_CREATED_BY]: DataTypes.INTEGER,
    [ATTR_INT_UPDATED_BY]: DataTypes.INTEGER,
    [ATTR_DATETIME_DELETED_AT]: DataTypes.STRING
  }, {
    sequelize,
    modelName: ATTR_TABLE,
  });
  return Users;
};