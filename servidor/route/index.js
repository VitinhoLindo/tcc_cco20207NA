const { Router } = require('express');
const route = Router();

route.use('/', require('../api/index'));
route.use('/login', require('../api/Login'));
route.use('/forgotem', require('../api/Forgotem'));
route.use('/config', require('../api/Config'));
route.use('/app', require('../api/App'));
route.use('/translate', require('../api/Translate'));
route.use('/interface/{field}', require('../api/Interface'))

module.exports = route;