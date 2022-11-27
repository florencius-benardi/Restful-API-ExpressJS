const authentication = {
    generateToken: (req, res, next) => { res.send('ok') },
    validationToken: () => { },
    getAccessToken: () => { },
    revokeToken: () => { }
}

exports.authentication