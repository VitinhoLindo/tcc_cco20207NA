const { Router } = require('express');
const { MainController, CssController, JsController, ImageController } = require('../controller');
const route = Router();


route.get('/', async (request, response) => {
    let controller = new MainController(request, response);
    await controller.on();
});

route.get('/css/:file', async (request, response) => {
    let controller = new CssController(request, response);
    await controller.on();
});

route.get('/js/:file', async (request, response) => {
    let controller = new JsController(request, response);
    await controller.on();
});

route.get('/img/:file', async (request, response) => {
    let controller = new ImageController(request, response);
    await controller.on();
});

module.exports = route;