const { request, response } = require('express');
const Storage   = require('../app/storage');

class Controller extends Storage {
    constructor(_request = request, _response = response) {
        super();

        this._dirname_ = _request._dirname_;
        this.request = _request;
        this.response = _response;
    }

    setHeader(content, mimetype) {
        this.response.setHeader(content, mimetype);
    }

    end() {
        this.response.end();
    }

    formatResponse(code = 200, status = 200, message, result, error = false) {
        this.response.status(code);
        this.response.json({
            code    : status,
            message : message,
            result  : result,
            status  : (error) ? 'error' : 'success'
        });
        this.end();
        return true;
    }
}

module.exports = Controller;