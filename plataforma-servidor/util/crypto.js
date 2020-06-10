const Util = require('./util');

class Crypto extends Util {
    pass      = 'aseqwease';
    key       = null;
    crypto = require('crypto');
    
    constructor() {
        super();
        this.reset();
    }

    async encrypt() {
    }

    async decrypt() {
    }

    async reset() {
        if (!!this.pass) {
            
        }

        this.pass = this.randomText(this.passrange);
    }
}

module.exports = Crypto;