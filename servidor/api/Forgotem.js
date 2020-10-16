const { Router } = require('express');
const ForgotemController = require('../http/controller/ForgotemController');
const route = Router();

route.options('/', (request, response) => {
  (new ForgotemController(request, response)).optionForgotem();
});

route.post('/', (request, response) => {
  (new ForgotemController(request, response)).forgotem();
});

route.post('/code', (request, response) => {
  (new ForgotemController(request, response)).forgotemCode();
});

route.post('/alter', (request, response) => {
  (new ForgotemController(request, response)).forgotemAlter();
});

module.exports = route;