const { Router } = require('express');
const ConfigController = require('../http/controller/ConfigController');
const route = Router();

route.post('/person', (request, response) => {
  (new ConfigController(request, response)).get();
});

module.exports = route;