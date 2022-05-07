require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "migrationStorageTableName": "migrations",
    "dialect": process.env.DB_CONNECTION
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_HOST,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "migrationStorageTableName": "migrations",
    "dialect": process.env.DB_CONNECTION
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_HOST,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "migrationStorageTableName": "migrations",
    "dialect": process.env.DB_CONNECTION
  }
}
