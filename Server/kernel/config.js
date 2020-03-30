const Event = require('./events');
const Dotenv = require('dotenv');

class Config extends Event {
  constructor() {
    super();
    Dotenv.config();
    this.os = require('os');
    this.serverOptions = {
      host: process.env.HOSTNAME,
      port: process.env.PORT
    };
    this.getAddress();
  }

  getAddress() {
    let interfaces = this.os.networkInterfaces();
    let keys = Object.keys(interfaces);
    this.serverOptions.host = interfaces[keys[1]][0].address;
  }
}

module.exports = Config;