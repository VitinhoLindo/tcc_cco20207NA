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
    
    setStatus(code) {
        this.response.status(code);
    }

    end() {
        this.response.end();
    }

    formatResponse(code = 200, status = 200, message, result, error = false) {
        this.setHeader('Content-Type', 'application/json');
        this.setStatus(code);

        this.response.json({
            code    : status,
            message : message,
            result  : result,
            status  : (error) ? 'error' : 'success'
        });
        this.end();
        return true;
    }

    sendFile(fileInfo) {
        if (fileInfo.status) {
            if (fileInfo.mimeType) this.setHeader('Content-Type', fileInfo.mimeType);
            this.setStatus(200);
            this.response.write(fileInfo.file);
        } else {
            this.setStatus(404);
        }
        this.end();
        return true;
    }
}

module.exports = Controller;