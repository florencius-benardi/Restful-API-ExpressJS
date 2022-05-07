const pg = require('pg')

require('dotenv').config()

const { Pool } = pg

const postgre = (callback = null) => {

    const dbConfig = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }

    const pool = new Pool(dbConfig)

    const connection = {
        pool,
        query: (...args) => {
            return pool.connect().then((client) => {
                return client.query(...args).then((res) => {
                    client.release()
                    return res.rows
                })
            })
        },
    }

    process.pg = connection;

    if (callback) {
        callback(connection);
    }

    return connection;
}

module.exports = postgre