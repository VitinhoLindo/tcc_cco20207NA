const { request, response } = require('express');
const { Api: { FormatReponse } } = require('../interfaces');
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

    formatResponse(opt = new FormatReponse) {
        opt = new FormatReponse(opt);
        this.setHeader('Content-Type', 'application/json');
        this.setStatus(opt.responseCode);

        this.response.json({
            code    : opt.requestCode,
            message : opt.message,
            result  : opt.result,
            status  : opt.status
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