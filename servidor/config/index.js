const Cache = require('../resource/lib/Cache');

class Config extends Cache {
  config = {
    host: '',
    port: ''
  }

  constructor() { 
    super();
    this.setServerConfig();
  }
  
  getProtocol() {
    return {
      option: null,
      protocol: this.http
    };
  }
  
  setServerConfig() {
    this.config.host = this.process.env.HOST;
    this.config.port = this.process.env.PORT;
  
    if (!this.config.host) this.config.host = 'localhost';
    if (!this.config.port) this.config.port = 3000;
  }
}

module.exports = Config;