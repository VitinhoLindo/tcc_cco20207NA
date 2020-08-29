const { Router } = require('express');
const AppController = require('../http/controller/AppController');
const route = Router();

route.options('/', (request, response) => {
  (new AppController(request, response)).options();
});

route.post('/', (request, response) => {
  (new AppController(request, response)).get();
});

module.exports = route;