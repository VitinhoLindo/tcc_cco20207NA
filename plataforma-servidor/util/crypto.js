const Util = require('./util');

class Crypto extends Util {
    pass       = '';
    key        = null;
    crypto     = require('crypto');
    createDate = new Date;
    
    constructor() {
        super();
    }

    async encrypt() {
    }

    async decrypt() {
    }

    async reset() {
        if (!!this.pass) {
            await this.setFile({ 
                value    : JSON.stringify({ date: this.createDate, pass: this.pass }),
                path     : `${this._dirname_}${this.dirFiles.log.dir}${this.dirFiles.log.crypto.dir}`,
                file     : this.dirFiles.log.crypto.logFileName.replace(/@date@/g, this.createDate.toLocaleDateString()),
                encoding : 'utf8'
            });
        }

        this.createDate = new Date();
        this.pass       = this.randomText(this.passrange);
    }
}

module.exports = Crypto;