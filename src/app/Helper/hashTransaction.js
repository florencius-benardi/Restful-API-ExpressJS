require('dotenv').config();

const Hashids = require('hashids/cjs')

module.exports = {
    encode: (id) => {
        const hashids = new Hashids('', 8)
        const salt = process.env.HASHIDS_SALT
        const randNumber = parseInt((Math.random() * (100 - 50 + 1)), 10) + 50
        return hashids.encode([salt, id, randNumber])
    },
    decode: (id) => {
        const hashids = new Hashids('', 8)
        return hashids.decode(id)[1]
    }

}
