const { request, response } = require('express');
const Storage = require('../app/storage');

class CssController extends Storage {
    constructor(_request = request, _response = response) {
        super();
        this.request  = _request;
        this.response = _response;

        this._dirname_ = this.request._dirname_;
    }

    async getFile() {
        let file = this.request.params.file;

        let filexists = await this.fileExistsSync('utf8', this._dirname_, this.dirFiles.public.dir, this.dirFiles.public.css, `/${file}`);

        if (filexists.status) {
            this.response.status(200);
            this.response.write(filexists.file);
        } else {
            this.response.status(404);
        }
    }

    async on() {
        await this.getFile();
        this.response.end();
    }
}

module.exports = CssController;