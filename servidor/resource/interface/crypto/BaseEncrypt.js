var encodings = ["ascii", "utf8", "utf-8", "utf16le", "ucs2", "ucs-2", "base64", "latin1", "binary", "hex"];

class Model {
    encoding = '';
    _encoding = '';

    constructor() { }

    static getEncodings() {
        return encodings;
    }
}

module.exports = Model;