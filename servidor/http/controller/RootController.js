const BaseController = require('../../resource/http/BaseController');

class RootController extends BaseController {
  constructor(request, response) { super(request, response); }

  async get() {
    this.defaultResponseJSON();
    this.resEnd();
  }
}

module.exports = RootController;