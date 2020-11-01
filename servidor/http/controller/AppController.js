const BaseController = require('../../resource/http/BaseController');
const AppConfig = require('../../app/AppConfig');

class AppController extends BaseController {
  model = new AppConfig();

  constructor(request, response) { super(request, response); }

  async options () {
    return this.defaultResponseJSON({
      result: {
        appNames: 'required|array|min:1'
      } 
    });
  }

  async get() {
    let user = await this._user();

    return this.defaultResponseJSON({ result: await this.model.where({ column: 'auth', value: !!user }).get() });
  }
}

module.exports = AppController;