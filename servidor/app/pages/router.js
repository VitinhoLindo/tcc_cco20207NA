const BaseController = require('../../resource/http/BaseController');
const VueApi = require('./vueApi');

class RouterController extends BaseController {
  constructor(request, response) { super(request, response); }

  static getRoutes() {
    return [
      {
        route: '/:resource/',
        method: 'GET',
        function: ''
      }
    ]
  }

  static estance() {
    return RouterController;
  }

  async option() {
    return this.defaultResponseJSON();
  }
  
  async get() {
    let resource = this.request.params.resource;

    return this.defaultResponseJSON({
      result: VueApi[resource].render()
    });
  }

  async delete() {
    return this.defaultResponseJSON();
  }

  async put() {
    return this.defaultResponseJSON();
  }

  async post() {
    return this.defaultResponseJSON();
  }
}

module.exports = RouterController;