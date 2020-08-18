const BaseEncrypt = require('./BaseEncrypt');

class Model extends BaseEncrypt {
  value = '';
  date = new Date();

  constructor() { super(); }

  static getRules() {
    return {
      rules: {
        value: 'required',
        date: 'required|datetime',
        encoding: 'required|string',
        _encoding: 'required|string'
      },
      encodings: this.getEncodings(),
    }
  }
}

module.exports = Model;