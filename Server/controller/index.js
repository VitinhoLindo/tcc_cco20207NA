const Router = require('../routes');

class Controller extends Router {
  constructor() {
    super();
    this.apiListen();
  }
}

module.exports = Controller;