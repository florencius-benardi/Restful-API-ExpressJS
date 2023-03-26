require('dotenv').config();

const Hashids = require('hashids/cjs')

module.exports = {
    isEmail: (text) => {
        return !!(String(text)
            .toLowerCase()
            .match(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            ));
    }
}
