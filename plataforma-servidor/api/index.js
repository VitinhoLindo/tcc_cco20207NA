const { Router } = require('express');
const {
    MainController,
    CssController,
    JsController,
    ImageController,
    LoginController
} = require('../controller');
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

route.post('/login', async (request, response) => {
    let controller = new LoginController(request, response);
    await controller.auth();
});

route.post('/forgotem', async (request, response) => {
    let controller = new LoginController(request, response);
    await controller.forgotem();
});

route.post('/forgotem/message', async (request, response) => {
    let controller = new LoginController(request, response);
    await controller.getForgotemMessage();
});

route.post('/forgotem/code', async (request, response) => {
    let controller = new LoginController(request, response);
    await controller.forgotemCode();
});

route.post('/forgotem/redefine', async (request, response) => {
    let controller = new LoginController(request, response);
    await controller.redefineKey();
});

module.exports = route;