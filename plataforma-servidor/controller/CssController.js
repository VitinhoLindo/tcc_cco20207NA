const { request, response } = require('express');
const Storage = require('../app/storage');

class CssController extends Storage {
    constructor(_request = request, _response = response) {
        super();
        if (_request && _response) {
            this.request  = _request;
            this.response = _response;
    
            this._dirname_ = this.request._dirname_;
        }
    }

    async getFile() {
        this.response.status(404);
        let file = this.request.params.file;
        let filexists = await this.getFileInfo('binary', this._dirname_, this.dirFiles.public.dir, this.dirFiles.public.css, `/${file}`);

        if (filexists.status) {
            if (filexists.mimeType) this.response.setHeader('Content-Type', filexists.mimeType);
            this.response.status(200);
            this.response.write(filexists.file);
        }
    }

    async on() {
        if (this.request) {
            await this.getFile();
            this.response.end();
        }
    }
}

module.exports = CssController;