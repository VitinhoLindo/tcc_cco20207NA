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
        let filexists = await this.fileExistsSync('binary', this._dirname_, this.dirFiles.public.dir, this.dirFiles.public.html, '/index.html');

        if (filexists.status) {
            this.response.status(200);
            try {
                this.response.write(filexists.file);
            } catch (error) {
                
            }
        } else {
            this.response.status(404);
        }

        return true;
    }

    async getIco() {
    }
    
    async on() {
        await this.getContent();
        return true;
    }

    async end() {
        this.response.end();
    }
}

module.exports = MainController;