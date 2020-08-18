const { Router } = require('express');
const route = Router();

route.use('/', require('../api/index'));
route.use('/login', require('../api/Login'));

module.exports = route;