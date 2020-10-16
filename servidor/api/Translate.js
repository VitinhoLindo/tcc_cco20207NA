const { Router } = require('express');
const TranslateController = require('../http/controller/TranslateController');
const route = Router();

route.options('/', (req, res) => {
  const translateController = new TranslateController(req, res);
  translateController.options();
});

route.get('/', (req, res) => {
  const translateController = new TranslateController(req, res);
  translateController.get();
})

route.get('/languages', (req, res) => {
  const translateController = new TranslateController(req, res);
  translateController.getLanguages();
})

module.exports = route;