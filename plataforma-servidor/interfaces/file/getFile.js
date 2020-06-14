const BaseFile = require('./BaseFile');

class GetFile extends BaseFile {
    convertType = '';

    constructor() {
        super();
    }
}

module.exports = new GetFile;