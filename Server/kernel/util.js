const Config = require('./config');
const { request, response, Router } = require('express');
const Http = require("http");

class Util extends Config {
  constructor() {
    super();
    this.Express = require('express')();
    this.Router = Router();
    this.request = request;
    this.response = response;
    this.Server = Http.createServer({}, this.Express);
  }
}

module.exports = Util;