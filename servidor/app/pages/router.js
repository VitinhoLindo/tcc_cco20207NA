const BaseController = require('../../resource/http/BaseController');

class RouterController extends BaseController {
  constructor(request, response) { super(request, response); }

  async option() {
    
  }
  
  async get() {
    this.defaultResponseJSON();
    this.resEnd();
  }

  async delete() {
    this.defaultResponseJSON();
    this.resEnd();
  }

  async put() {
    this.defaultResponseJSON();
    this.resEnd();
  }

  async post() {
    this.defaultResponseJSON();
    this.resEnd();
  }
}

module.exports = RouterController;