'use strict';
const {
  Model
} = require('sequelize');

const userTokenFields = require('../tableColumns/system/usertokens')

module.exports = (sequelize, DataTypes) => {
  class UserTokens extends Model {
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
    ATTR_INT_ID,
    ATTR_CHAR_TYPE,
    ATTR_INT_USER,
    ATTR_CHAR_NAME,
    ATTR_JSON_ABILITIES,
    ATTR_CHAR_TOKEN,
    ATTR_DATETIME_LAST_USED_AT,
    ATTR_DATETIME_EXPIRED_AT,
    ATTR_DATETIME_CREATED_AT,
    ATTR_DATETIME_UPDATED_AT
  } = userTokenFields

  UserTokens.init({
    [ATTR_INT_ID]: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    [ATTR_CHAR_TYPE]: {
      type: DataTypes.STRING,
      allowNull: false
    },
    [ATTR_CHAR_NAME]: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    [ATTR_INT_USER]: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    [ATTR_CHAR_TOKEN]: {
      type: DataTypes.STRING,
      allowNull: false
    },
    [ATTR_JSON_ABILITIES]: {
      type: DataTypes.STRING,
      allowNull: true
    },
    [ATTR_DATETIME_EXPIRED_AT]: {
      type: DataTypes.DATE,
      allowNull: true
    },
    [ATTR_DATETIME_LAST_USED_AT]: {
      type: DataTypes.DATE,
      allowNull: true
    },
    [ATTR_DATETIME_CREATED_AT]: {
      type: DataTypes.DATE,
      allowNull: true
    },
    [ATTR_DATETIME_UPDATED_AT]: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    underscored: true,
    modelName: ATTR_TABLE,
    timestamps: true,
    createdAt: ATTR_DATETIME_CREATED_AT,
    updatedAt: ATTR_DATETIME_UPDATED_AT,
    paranoid: false,
  });
  return UserTokens;
};