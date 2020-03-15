const Kernel = require('../kernel');
const Api = require('./api');

class Router extends Kernel {
  constructor() {
    super();
    this.Api = new Api;
  }

  async apiListen() {
    this.Express.post('/', this.Api.Post);
    this.Express.get('/', this.Api.Get);
    this.Express.put('/', this.Api.Put);
    this.Express.delete('/', this.Api.Delete);
  }
}

module.exports = Router;