const { Router } = require('express');
const LoginController = require('../http/controller/LoginController');
const route = Router();

route.options('/', (request, response) => {
  (new LoginController(request, response)).option();
});

route.post('/', (request, response) => {
  (new LoginController(request, response)).singIn();
});

route.post('/code', (request, response) => {
  (new LoginController(request, response)).singInCode();
});

module.exports = route;