const { Mongo: { Options: { CollectionOption } } } = require('../interface');
const Collection = require('./Collection');
const { MONGODB } = require('../orm');

var database = '';
var collection = '';
const mongoORM = new MONGODB;


class BaseModel {
  constructor() { }

  use(object = new CollectionOption) {
    database = object.database || null;
    collection = object.collection || null;
  }

  _getConfig() {
    return {
      database: database,
      collection: collection
    };
  }
}

module.exports = BaseModel;