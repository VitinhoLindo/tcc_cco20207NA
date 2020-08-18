const { Router } = require('express');
const LoginController = require('../http/controller/LoginController');
const route = Router();

route.options('/', (request, response) => {
  (new LoginController(request, response)).option();
});

route.post('/', (request, response) => {
  (new LoginController(request, response)).singIn();
});

module.exports = route;