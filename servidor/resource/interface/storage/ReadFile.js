const BaseStorage = require('./BaseStorage');

class ReadFile extends BaseStorage {
    path = '';
    data = null;
    
    constructor(opt) {
        super();
        if (opt) {
            this.path     = opt.path;
            this.data     = opt.data;
            this.typeFile = opt.typeFile;
            this.encoding = opt.encoding;
        }
    }
}

module.exports = ReadFile;