'use strict'

global.responseJson = (res, data, message, status) => {
    var responses = {
        status,
        data,
        message
    }
    res.setHeader('Content-Type', 'application/json');
    return res.status(status).end(JSON.stringify(responses));
}