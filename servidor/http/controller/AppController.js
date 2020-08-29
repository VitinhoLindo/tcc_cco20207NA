const BaseController = require('../../resource/http/BaseController');
const AppConfig = require('../../app/AppConfig');

class AppController extends BaseController {
  model = new AppConfig();

  constructor(request, response) { super(request, response); }

  async options () {
    this.defaultResponseJSON({
      result: {
        appNames: 'required|array|min:1'
      } 
    });
    this.resEnd();
    return;
  }

  async get() {
    let validator = this.Validator.make(this.request.body, {
      appNames: 'required|array|min:1'
    }, {
      appNames: {
        required: 'appNames é necessário',
        array: 'tipo de dado tem que ser array',
        'min:1': 'minimo de 1 é requerido'
      }
    });

    if (validator.fails()) {
      this.defaultResponseJSON(validator.modelResponse());
      this.resEnd();
      return;
    }

    let res = await this.model.whereIn({ column: 'name', value: this.request.body.appNames }).get();

    var apps = {};

    res.values.forEach((app) => {
      delete app._id;
      apps[app.name] = app;
    });

    this.defaultResponseJSON({ result: apps });
    this.resEnd();
  }
}

module.exports = AppController;