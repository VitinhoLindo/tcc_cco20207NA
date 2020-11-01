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
    resource = VueApi[resource];

    if (!resource) return this.defaultResponseJSON({ status: 404 });
    return this.defaultResponseJSON({
      result: resource.render()
    });
  }

  async post() {
    let resource = this.request.params.resource;
    resource = VueApi[resource];

    if (!resource) return this.defaultResponseJSON({ status: 404 });
    return resource.build(this.request, this.response);
  }

  async delete() {
    return this.defaultResponseJSON();
  }

  async put() {
    return this.defaultResponseJSON();
  }
}

module.exports = RouterController;