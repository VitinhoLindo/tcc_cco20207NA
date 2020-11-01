const { 
  BaseApi, 
  Fields: { 
    Input,
    Button,
    Link
  }
} = require('./Base');
const ForgotemController = require('../../http/controller/ForgotemController');
const LoginModel = require('../Login')

class Forgotem extends BaseApi {

  model = LoginModel.constructor;

  interfaces = { login: '/interface/login' };

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
      Button.make('send')
            .event('click')
            .action('submit')
            .path('/forgotem', 'POST')
    ];
  }

  build(request, response) {
    return ForgotemController.using(request, response).render();
  }
}

module.exports = new Forgotem;