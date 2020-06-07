const { request, response } = require('express');
const Storage = require('../app/storage');

class MainController extends Storage {
    constructor(_request = request, _response = response) {
        super();
        this.request  = _request;
        this.response = _response;

        this._dirname_ = this.request._dirname_;
    }

    async getContent() {
        let filexists = await this.fileExistsSync('utf8', this._dirname_, this.dirFiles.public.dir, this.dirFiles.public.html, '/index.html');

        if (filexists.bool) {
            this.response.status(200);
            this.response.write(filexists.file);
        } else {
            this.response.status(404);
        }
    }

    async getIco() {
    }
    
    async on() {
        console.log(this.request.url);
        await this.getContent();
        this.response.end();
        return true;
    }
}

module.exports = MainController;