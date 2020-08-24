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
    }, {
      login: {
        required: 'A informação do login é necessária para o login',
        email: 'A informação do login não contém padrão de e-mail',
        'min:5': 'A informação do login não é maior que 5 characteres'
      },
      key: {
        required: 'A informação da key é necessária para o login',
        string: 'O tipo de informação de key não é string',
        'min:5': 'A informação de key não é maior que 5 characteres'
      }
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

    let _login = await this.login.where({ column: 'login', value: login }).get();

    if (!_login.count()) {
      this.defaultResponseJSON({
        result: {
          error: {
            login: 'Não existe conta com este e-mail'
          }
        }
      });
      this.resEnd();
      return;
    } else _login = _login.first();

    if (_login.senha == key) {
      this.defaultResponseJSON({
        result: {
          success: true
        }
      });
    } else {
      this.defaultResponseJSON({
        result: {
          error: {
            key: 'login ou senha incorreto'
          }
        }
      });
    }
    this.resEnd();
  }
}

module.exports = LoginController;