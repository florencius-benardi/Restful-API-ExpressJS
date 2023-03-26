'use strict';
const {
  Model
} = require('sequelize');

const userFields = require('../tableColumns/system/users');
const { ATTR_TABLE, ATTR_CHAR_FORMAT, ATTR_CHAR_MODULE, ATTR_CHAR_CODE, ATTR_CHAR_LAST_NO, ATTR_INT_LAST_NO, ATTR_INT_ID, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_DATETIME_DELETED_AT } = require('../tableColumns/system/transactioncodes');

module.exports = (sequelize, DataTypes) => {
  class TransactionCodeDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionCodeDetails.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransactionCodeDetails',
  });
  return TransactionCodeDetails;
};