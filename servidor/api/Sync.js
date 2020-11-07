const { Router } = require('express');
const SyncController = require('../http/controller/SyncController');
const route = Router();

route.options('/', (request, response) => {
    SyncController.using(request, response).option();
});

route.post('/', (request, response) => {
    SyncController.using(request, response).post();
});

route.post('/test/', (request, response) => {
    SyncController.using(request, response).testDecrypt();
});

module.exports = route;