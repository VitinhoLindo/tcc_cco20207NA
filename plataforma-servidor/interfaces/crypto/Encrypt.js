const BaseEncrypt = require('./BaseEncrypt');

class Model extends BaseEncrypt {
    value = '';
    date  = new Date();

    constructor(opt) {
        super();
        if (opt) {
            this.value     = opt.value;
            this.date      = opt.date;
            this.encoding  = opt.encoding;
            this._encoding = opt._encoding;
        }
    }
}

module.exports = Model;