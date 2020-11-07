const Cache = require('../resource/lib/Cache');

class Config extends Cache {
  config = {
    name: 'http',
    host: '',
    port: ''
  }

  serverOption = {
    key: null,
    cert: null
  }

  constructor() {
    super();
    this.setServerConfig();
  }

  getProtocol() {
    let object = {
      option: null,
      protocol: this.http
    };

    try {
      throw '';
      this.serverOption.key = this.fs.readFileSync(`${this.dirFiles._dirname_}/config/ssl/key.pem`);
      this.serverOption.cert = this.fs.readFileSync(`${this.dirFiles._dirname_}/config/ssl/cert.pem`);

      this.config.name = 'https';
      this.config.port = this.process.env.HTTPS_PORT || 403;

      object.option = this.serverOption;
      object.protocol = this.https;
    } catch (error) {
      this.emit('print', [{ message: `read ssl config failed`, color: 'red' }]);
    }

    return object;
  }

  setServerConfig() {
    this.config.host = this.process.env.HOST;
    this.config.port = this.process.env.HTTP_PORT;

    if (!this.config.host) this.config.host = 'localhost';
    if (!this.config.port) this.config.port = 3000;
  }
}

module.exports = Config;