const ResultFormat = require('./resultFormat');

class FormatResponse {
    requestCode  = 200;
    responseCode = 200;
    message      = '';
    result       = ResultFormat;
    status       = 'success' || 'error'

    constructor(opt) {
        if (opt) {
            if (opt.requestCode)  this.requestCode  = opt.requestCode;
            if (opt.responseCode) this.responseCode = opt.responseCode;
            if (opt.message)      this.message      = opt.message;
            if (opt.result)       this.result       = opt.result;
            if (opt.status)       this.status       = 'error';
        }
    }
}

module.exports = FormatResponse;