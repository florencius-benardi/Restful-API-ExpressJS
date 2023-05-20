'use strict';
const {
  Model
} = require('sequelize')

const { ATTR_TABLE,
  ATTR_CHAR_OBJECT,
  ATTR_CHAR_DESCRIPTION,
  ATTR_INT_ID,
  ATTR_DATETIME_CREATED_AT,
  ATTR_DATETIME_UPDATED_AT,
  ATTR_INT_CREATED_BY,
  ATTR_INT_UPDATED_BY,
  ATTR_DATETIME_DELETED_AT, ATTR_CHAR_ENCRYPT, ATTR_RELATION_CREATED_BY, ATTR_RELATION_UPDATED_BY, ATTR_INT_VERSION } = require('../../tableColumns/system/modules')

const users = require('../../tableColumns/system/users')
const { encode } = require('../../app/Helper/hashTransaction')

module.exports = (sequelize, DataTypes) => {
  class Modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models[users.ATTR_TABLE], { foreignKey: ATTR_INT_CREATED_BY, as: ATTR_RELATION_CREATED_BY })
      this.belongsTo(models[users.ATTR_TABLE], { foreignKey: ATTR_INT_UPDATED_BY, as: ATTR_RELATION_UPDATED_BY })
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
    [ATTR_DATETIME_DELETED_AT]: {
      allowNull: true,
      type: DataTypes.DATE
    },
    [ATTR_INT_VERSION]: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    [ATTR_CHAR_ENCRYPT]: {
      type: DataTypes.VIRTUAL,
      get() {
        return encode(this[ATTR_INT_ID])
      }
    }
  }, {
    sequelize,
    underscored: true,
    version: true,
    modelName: ATTR_TABLE,
    timestamps: true,
    createdAt: ATTR_DATETIME_CREATED_AT,
    updatedAt: ATTR_DATETIME_UPDATED_AT,
    paranoid: true,
    deletedAt: ATTR_DATETIME_DELETED_AT,
  })

  return Modules;
};
