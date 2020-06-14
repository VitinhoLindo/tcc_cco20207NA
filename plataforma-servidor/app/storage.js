const Cache = require('./cache');
// const { Storage: { SaveFile, ReadFile } }   = require('../interfaces');
const { MySql } = require('../modules');

class Storage extends Cache {
    constructor() {
        super();

        this.on('save-file', this.saveFile);
        this.setConfig();
        this.MySqlModule = new MySql(this.mysqlConfig);
    }
}

module.exports = Storage;