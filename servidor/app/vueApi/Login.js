const { 
  BaseApi, 
  Fields: { 
    Input
  }
} = require('./Base');

class Login extends BaseApi {

  model = ""

  constructor() {
    super();
  }

  fields() {
    return [
      Input.make('Login', 'login')
           .using({ placeholder: 'login', cache: { time: 300 } })
           .rules('min:5|email|required'),
      Input.make('Senha', 'senha')
           .using({ placeholder: 'senha', cache: { time: 300 } })
           .rules('min:5|required')
           .protect('hash')
    ];
  }
}

module.exports = new Login;