const { Router } = require('express');
const ApiRouter = require('../app/pages/router');
const route = Router();

route.options('/', (request, response) => {
  (new ApiRouter(request, response)).options();
});

route.get('/', (request, response) => {
  (new ApiRouter(request, response)).get();
});

route.post('/', (request, response) => {
  (new ApiRouter(request, response)).post();
});

route.put('/', (request, response) => {
  (new ApiRouter(request, response)).delete();
});

route.delete('/', (request, response) => {
  (new ApiRouter(request, response)).delete();
});

module.exports = route;