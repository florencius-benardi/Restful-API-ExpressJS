const randomstring = require('randomstring')

module.exports = {
    randString: async (dataLength) => {
        return await randomstring.generate({
            length: dataLength,
            charset: 'alphanumeric',
        })
    }
}