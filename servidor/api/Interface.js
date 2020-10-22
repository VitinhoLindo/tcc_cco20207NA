const { Router } = require('express');
const ApiRouter = require('../app/pages/router');
const route = Router();

route.options('/:resource/', (request, response) => {
  ApiRouter.using(request, response).option();
});

route.get('/:resource/', (request, response) => {
  ApiRouter.using(request, response).get();
});

route.post('/:resource/', (request, response) => {
  ApiRouter.using(request, response).post();
});

route.put('/:resource/', (request, response) => {
  ApiRouter.using(request, response).put();
});

route.delete('/:resource/', (request, response) => {
  ApiRouter.using(request, response).delete();
});

// for (let apiRouter of ApiRouter.getRoutes()) {
//   console.log(apiRouter);
// }

module.exports = route;