'use strict';
const {
  Model
} = require('sequelize');

const userFields = require('../tableColumns/system/users');
const { ATTR_TABLE, ATTR_CHAR_FORMAT, ATTR_CHAR_MODULE, ATTR_CHAR_CODE, ATTR_CHAR_LAST_NO, ATTR_INT_LAST_NO, ATTR_INT_ID, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_DATETIME_DELETED_AT } = require('../tableColumns/system/transactioncodes');

module.exports = (sequelize, DataTypes) => {
  class TransactionCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  TransactionCodes.init({
    [ATTR_INT_ID]: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    [ATTR_CHAR_CODE]: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    [ATTR_CHAR_FORMAT]: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    [ATTR_CHAR_MODULE]: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    [ATTR_CHAR_LAST_NO]: {
      type: DataTypes.STRING,
      allowNull: true
    },
    [ATTR_INT_LAST_NO]: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
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
    [ATTR_DATETIME_CREATED_AT]: DataTypes.DATE,
    [ATTR_DATETIME_UPDATED_AT]: DataTypes.DATE,
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

  return TransactionCodes;
};