const BaseFile = require('./BaseFile');

class SetFile extends BaseFile {
    value = "";
    useDateInName = false;
    date  = new Date;

    constructor() {
        super();
    }
}

module.exports = new SetFile;