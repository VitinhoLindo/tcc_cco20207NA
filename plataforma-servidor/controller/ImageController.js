const Controller = require('./Controller');

class ImageController extends Controller {
    constructor(request,response) {
        super(request,response);
    }

    async getFile() {
        let file = this.request.params.file;
        let fileInfo = await this.getFileInfo('binary', this._dirname_ + this.dirFiles.public.dir + this.dirFiles.public.image + `/${file}`);
        return this.sendFile(fileInfo);
    }

    async on() {
        if (this.request)
            await this.getFile();
    }
}

module.exports = ImageController;