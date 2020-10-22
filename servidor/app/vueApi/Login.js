const { 
  BaseApi, 
  Fields: { 
    Input,
    Button
  }
} = require('./Base');
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
      Button.make('sing-in')
            .event('click')
            .action('submit')
            .path('/login', 'POST')
    ];
  }
}

module.exports = new Login;