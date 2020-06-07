const { request, response } = require('express');
const Storage = require('../app/storage');

class ImageController extends Storage {
    constructor(_request = request, _response = response) {
        super();
        this.request  = _request;
        this.response = _response;

        this._dirname_ = this.request._dirname_;
    }

    async getFile() {
        let file = this.request.params.file;
        let fileInfo = await this.getFileInfo('binary', this._dirname_ + this.dirFiles.public.dir + this.dirFiles.public.image + `/${file}`);

        if (fileInfo.status) {
            this.response.status(200);
            this.response.setHeader('Content-Type', fileInfo.mimeType);
            this.response.write(fileInfo.file);
        } else {
            this.response.status(404);
        }
    }

    async on() {
        await this.getFile();
        this.response.end();
    }
}

module.exports = ImageController;