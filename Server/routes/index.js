const Kernel = require('../kernel');
const Api = require('./api');

class Router extends Kernel {
  constructor() {
    super();
    this.Api = new Api;

    this.Express.use(this.Api.setHeader);
    this.Express.use(this.BodyParser.json());
    this.Express.use(this.BodyParser.urlencoded({ extended: true }));
    this.Express.route('/api/v1/user')
      .post(this.Api.getUser);

  }
}

module.exports = Router;