module.exports = {
    index: async (req, res, next) => {
        res.render('login', {
            pageTitle: 'Login Page',
            path: '/login',
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true
        });
    },
    generateToken: (req, res, next) => { res.send('ok') },
    validationToken: () => { },
    getAccessToken: () => { },
    revokeToken: () => { }
}