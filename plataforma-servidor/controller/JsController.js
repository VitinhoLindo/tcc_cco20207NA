const Controller = require('./Controller');

class JsController extends Controller {
    constructor(request, response) {
        super(request, response);
    }

    async getFile() {
        let file = this.request.params.file;
        let filexists = await this.getFileInfo('binary', this._dirname_, this.dirFiles.public.dir, this.dirFiles.public.js, `/${file}`)

        return this.sendFile(filexists);
    }

    async on() {
        if (this.request)
            return await this.getFile();
    }
}

module.exports = JsController;