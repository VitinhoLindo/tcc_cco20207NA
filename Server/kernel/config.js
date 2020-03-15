const Event = require('./events');
const Dotenv = require('dotenv');

class Config extends Event {
  constructor() {
    super();
    Dotenv.config();
    this.serverOptions = {
      host: process.env.HOSTNAME,
      port: process.env.PORT
    };
  }
}

module.exports = Config;