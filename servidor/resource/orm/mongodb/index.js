const Connection = require('./connection');

class MongoOrm {
  orm = new Connection();

  constructor() { }
}

module.exports = MongoOrm;