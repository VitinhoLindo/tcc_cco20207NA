class Model {
    encoding  = '';
    _encoding = '';

    encodings = ["ascii", "utf8", "utf-8", "utf16le", "ucs2", "ucs-2", "base64", "latin1", "binary", "hex"];

    constructor() {}

    inArray(value, array = []) {
        return array.indexOf(value) >= 0;
    }

    getEncodings() {
        return this.encodings;
    }
}

module.exports = Model;