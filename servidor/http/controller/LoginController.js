const BaseController = require('../../resource/http/BaseController');
const Login = require('../../app/Login');

class LoginController extends BaseController {
  login = new Login();

  constructor(request, response) {
    super(request, response);
  }

  option() {
    this.defaultResponseJSON({ result: { login: 'required|email|min:5', key: 'required|string|min:5' } });
    this.resEnd();
  }

  async singIn() {
    let validator = this.Validator.make(this.request.body, {
      login: 'required|email|min:5',
      key: 'required|string|min:5'
    });

    if (validator.fails()) {
      this.defaultResponseJSON(validator.modelResponse());
      this.resEnd();
      return;
    }

    const [login, key] = await Promise.all([
      this.app.hashable(this.request.body.login),
      this.app.hashable(this.request.body.key)
    ]);

    let _login = await this.login.where({ column: 'login', value: login }).first();

    if (_login.login == login && _login.senha == key) {

    } else {

    }
    this.resEnd();
  }
}

module.exports = LoginController;