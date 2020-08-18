const Config = require('../config');
const Middleware = require('./middleware');

class Http extends Config {
  constructor() {
    super();
  }

  async listen() {
    let result = this.getProtocol();
    var server = null;

    Middleware(this.express, this);
    if (result.option) server = result.protocol.createServer(result.option, this.express);
    else server = result.protocol.createServer(this.express);

    server.listen(this.config, () => {
      this.print([{ message: 'server open in', color: 'blue' }, { message: `http://${this.config.host}:${this.config.port}/`, color: 'magenta' }]);
    });
  }
}

module.exports = (_dirname_) => {
  let http = new Http();

  http.setPataform(_dirname_);
  http.setServerConfig();

  return http;
}