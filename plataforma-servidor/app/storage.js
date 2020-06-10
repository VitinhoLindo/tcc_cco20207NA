const Cache = require('./cache');
const { Storage: { SaveFile, ReadFile } }   = require('../interfaces');

class Storage extends Cache {
    constructor() {
        super();

        this.on('save-file', this.saveFile);
    }

    async saveFile(opt = new SaveFile) {
        let _SaveFile = new SaveFile(opt);
    }

    async readFile(opt = new ReadFile) {
        let _ReadFile = new ReadFile(opt);
    }
}

module.exports = Storage;