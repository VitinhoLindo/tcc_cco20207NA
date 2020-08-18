const Event = require('./Event');

class Modules extends Event {
  http = require('http');
  https = require('https');
  fs = require('fs');
  os = require('os');
  process = require('process');
  express = require('express')();
  crypto = require('crypto');
  Validator = require('../http/Validator');

  constructor() { super(); }
}

module.exports = Modules;