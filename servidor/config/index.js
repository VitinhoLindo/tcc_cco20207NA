const Cache = require('../resource/lib/Cache');

class Config extends Cache {
  config = {
    host: '10.0.0.108',
    port: 3000
  }

  constructor() { super(); }

  getProtocol() {
    return {
      option: null,
      protocol: this.http
    };
  }

  setServerConfig() {

  }
}

module.exports = Config;