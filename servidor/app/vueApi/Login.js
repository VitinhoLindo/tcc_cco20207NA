const { 
  BaseApi, 
  Fields: { 
    Input,
    Button,
    Link
  }
} = require('./Base');
const LoginController = require('../../http/controller/LoginController');
const LoginModel = require('../Login')

class Login extends BaseApi {

  model = LoginModel.constructor;

  interfaces = { forgotem: '/interface/forgotem' };

  constructor() {
    super();
  }

  fields() {
    return [
      Input.make('Login', 'login')
           .using({ placeholder: 'login', cache: { time: 300 } })
           .rules('min:5|email|required')
           .protect('hash')
           .type("mail"),
      Input.make('Senha', 'senha')
           .using({ placeholder: 'senha', cache: { time: 300 } })
           .rules('min:5|required')
           .protect('hash')
           .type('pass'),
      Link.make('forgotem password')
            .event('click')
            .action('field')
            .path('/interface/forgotem', 'GET')
            .changeField('forgotem'),
      Button.make('sing-in')
            .event('click')
            .action('submit')
            .path('/login', 'POST')
    ];
  }

  build(request, response) {
    return LoginController.using(request, response).render();
  }
}

module.exports = new Login;