'use strict';

require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const { ATTR_TABLE, ATTR_CHAR_USERNAME, ATTR_CHAR_EMAIL, ATTR_CHAR_PASSWORD, ATTR_INT_WRONG_PASS, ATTR_INT_STATUS, ATTR_CHAR_CONFIRMATION_CODE, ATTR_DATETIME_LAST_REQUEST_TIME, ATTR_DATETIME_VERIFIED, ATTR_INT_ID, ATTR_DATETIME_CREATED_AT, ATTR_DATETIME_UPDATED_AT, ATTR_INT_CREATED_BY, ATTR_INT_UPDATED_BY, ATTR_DATETIME_DELETED_AT, ATTR_RELATION_CREATED_BY, ATTR_RELATION_UPDATED_BY, ATTR_CHAR_ENCRYPT, ATTR_INT_VERSION, ATTR_CHAR_LASTNAME, ATTR_CHAR_FIRSTNAME, ATTR_RELATION_ROLES } = require('../../tableColumns/system/users')
const userroles = require('../../tableColumns/system/userroles')
const { encode } = require('../../app/Helper/hashTransaction');

const userSchema = new Schema(
  {
    [ATTR_CHAR_USERNAME]: {
      type: String,
      required: true,
      upperCase: true
    },
    [ATTR_CHAR_FIRSTNAME]: {
      type: String,
      required: true
    },
    [ATTR_CHAR_LASTNAME]: {
      type: String,
      required: false
    },
    [ATTR_CHAR_EMAIL]: {
      type: String,
      required: true,
    },
    [ATTR_CHAR_PASSWORD]: {
      type: String,
      required: true,
    },
    [ATTR_INT_WRONG_PASS]: {
      type: Number,
      required: false,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
      },
      default: 0
    },
    [ATTR_INT_STATUS]: {
      type: Number,
      required: false,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
      },
      default: 0
    },
    [ATTR_INT_CREATED_BY]: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: ATTR_TABLE
    },
    [ATTR_INT_UPDATED_BY]: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: ATTR_TABLE
    },
    [ATTR_CHAR_CONFIRMATION_CODE]: {
      type: String,
      required: true,
    },
    [ATTR_DATETIME_CREATED_AT]: {
      required: true,
      type: Date
    },
    [ATTR_DATETIME_UPDATED_AT]: {
      required: true,
      type: Date
    },
    [ATTR_DATETIME_VERIFIED]: {
      required: true,
      type: Date
    },
    [ATTR_DATETIME_DELETED_AT]: {
      required: true,
      type: Date
    }
  }, {
  virtuals: {
    [ATTR_CHAR_ENCRYPT]: {
      get() {
        return encode(this[ATTR_INT_ID])
      }
    }
  }
})

module.exports = mongoose.model(ATTR_TABLE, userSchema)