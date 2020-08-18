const { Router } = require('express');
const RootController = require('../http/controller/RootController');
const route = Router();

route.get('/', (req, res) => {
  const rootController = new RootController(req, res);
  rootController.get();
})

module.exports = route;