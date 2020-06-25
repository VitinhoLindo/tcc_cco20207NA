const Controller = require('./Controller');

class MainController extends Controller {
    constructor(request, response) {
        super(request, response);
    }

    async getContent() {
        let filexists = await this.fileExistsSync('binary', this._dirname_, this.dirFiles.public.dir, this.dirFiles.public.html, '/index.html');

        return this.sendFile(filexists);
    }
    
    async on() {
        if (this.request)
            return await this.getContent();
    }
}

module.exports = MainController;