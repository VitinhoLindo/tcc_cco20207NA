const Cache = require('../resource/lib/Cache');

class Config extends Cache {
  config = {
    host: '',
    port: ''
  }

  serverOption = {
    key: null,
    cert: null,
    passphare: ''
  }

  constructor() { 
    super();
    this.setServerConfig();
  }
  
  getProtocol() {
    this.serverOption.key = this.fs.readFileSync( `${this.dirFiles._dirname_}/config/ssl/rsa-priv.pem`);
    this.serverOption.cert = this.fs.readFileSync(`${this.dirFiles._dirname_}/config/ssl/ssl.crt`);
    this.serverOption.passphare = this.process.env.SSL_PASS;

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