const Controller = require('./Controller');

class CssController extends Controller {
    constructor(request, response) {
        super(request, response);
    }

    async getFile() {
        let file = this.request.params.file;
        let filexists = await this.getFileInfo('binary', this._dirname_, this.dirFiles.public.dir, this.dirFiles.public.css, `/${file}`);

        this.sendFile(filexists);
    }

    async on() {
        if (this.request)
            await this.getFile();
    }
}

module.exports = CssController;