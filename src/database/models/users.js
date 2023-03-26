'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { ATTR_TABLE, ATTR_CHAR_USERNAME, ATTR_CHAR_EMAIL, ATTR_CHAR_PASSWORD, ATTR_CHAR_MOBILE, ATTR_INT_WRONG_PASS, ATTR_INT_STATUS, ATTR_CHAR_CONFIRMATION_CODE, ATTR_DATETIME_LAST_REQUEST_TIME, ATTR_DATETIME_VERIFIED, ATTR_INT_ID, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_DATETIME_DELETED_AT, ATTR_RELATION_CREATED_BY, ATTR_RELATION_UPDATED_BY, ATTR_CHAR_ENCRYPT } = require('../tableColumns/system/users');
const { encode } = require('../../app/Helper/hashTransaction');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: ATTR_INT_CREATED_BY, as: ATTR_RELATION_CREATED_BY })
      this.belongsTo(models.users, { foreignKey: ATTR_INT_UPDATED_BY, as: ATTR_RELATION_UPDATED_BY })
    }
  }

  Users.init(
    {
      [ATTR_INT_ID]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      [ATTR_CHAR_USERNAME]: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: {
          args: true,
          msg: 'The User Name is already taken!'
        },
        validate: {
          notNull: {
            args: ATTR_CHAR_USERNAME,
            msg: 'Please enter the User Name.'
          }
        },
      },
      [ATTR_CHAR_EMAIL]: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: {
          args: true,
          msg: 'Email already taken, Please input another email.'
        },
        validate: {
          isEmail: true,
          notNull: {
            args: ATTR_CHAR_USERNAME,
            msg: 'Please enter your email.'
          }
        },
      },
      [ATTR_CHAR_PASSWORD]: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: ATTR_CHAR_PASSWORD,
            msg: 'Please enter your password.'
          }
        },
      },
      [ATTR_CHAR_MOBILE]: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      [ATTR_INT_WRONG_PASS]: {
        type: DataTypes.SMALLINT,
        defaultValue: 0
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
      },
      [ATTR_CHAR_ENCRYPT]: {
        type: DataTypes.VIRTUAL,
        get() {
          return encode(this[ATTR_INT_ID]);
        }
      }
    }, {
    hooks: {
      beforeCreate: (user, options) => {
        const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT_ROUND))
        const encryptedPass = bcrypt.hashSync(user[ATTR_CHAR_PASSWORD], salt)
        user[ATTR_CHAR_EMAIL] = user[ATTR_CHAR_EMAIL].toLowerCase()
        user[ATTR_CHAR_USERNAME] = user[ATTR_CHAR_USERNAME].toUpperCase()
        user[ATTR_CHAR_PASSWORD] = encryptedPass
        user[ATTR_INT_WRONG_PASS] = 0
      }
    },
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
    },
  });

  Users.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }

  return Users;
};