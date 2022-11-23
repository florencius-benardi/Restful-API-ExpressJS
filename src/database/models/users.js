'use strict';

const { Model } = require('sequelize');

const userFields = require('../tableColumns/system/users')

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
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
    ATTR_DATETIME_VERIFIED,
    ATTR_INT_ID,
    ATTR_DATETIME_CREATED_AT,
    ATTR_DATETIME_UPDATED_AT,
    ATTR_INT_CREATED_BY,
    ATTR_INT_UPDATED_BY,
    ATTR_DATETIME_DELETED_AT
  } = userFields

  Users.init({
    [ATTR_INT_ID]: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    [ATTR_CHAR_USERNAME]: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    [ATTR_CHAR_FIRSTNAME]: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    [ATTR_CHAR_LASTNAME]: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    [ATTR_CHAR_EMAIL]: {
      allowNull: true,
      type: DataTypes.STRING(100),
      unique: true
    },
    [ATTR_CHAR_PASSWORD]: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    [ATTR_CHAR_MOBILE]: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    [ATTR_INT_WRONG_PASS]: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      default: 0
    },
    [ATTR_INT_STATUS]: {
      allowNull: true,
      type: DataTypes.SMALLINT,
    },
    [ATTR_INT_CREATED_BY]: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    [ATTR_INT_UPDATED_BY]: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    [ATTR_CHAR_CONFIRMATION_CODE]: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    [ATTR_DATETIME_LAST_REQUEST_TIME]: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    [ATTR_DATETIME_CREATED_AT]: {
      allowNull: true,
      type: DataTypes.DATE
    },
    [ATTR_DATETIME_UPDATED_AT]: {
      allowNull: true,
      type: DataTypes.DATE
    },
    [ATTR_DATETIME_VERIFIED]: {
      allowNull: true,
      type: DataTypes.DATE
    },
    [ATTR_DATETIME_DELETED_AT]: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    underscored: true,
    modelName: ATTR_TABLE,
    timestamps: true,
    createdAt: ATTR_DATETIME_CREATED_AT,
    updatedAt: ATTR_DATETIME_UPDATED_AT,
    paranoid: true,
    deletedAt: ATTR_DATETIME_DELETED_AT,
    defaultScope: {
      attributes: {
        exclude: [
          ATTR_CHAR_PASSWORD,
          ATTR_DATETIME_LAST_REQUEST_TIME,
          ATTR_CHAR_CONFIRMATION_CODE,
          ATTR_INT_WRONG_PASS,
          ATTR_DATETIME_VERIFIED
        ]
      },
    }
  });

  return Users;
};