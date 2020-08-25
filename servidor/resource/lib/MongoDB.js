const { Mongo: { Options: { CollectionOption } } } = require('../interface');
const Collection = require('./Collection');
const { MONGODB } = require('../orm');

var database = '';
var collection = '';
const mongoORM = new MONGODB;

var collections = {};

const setCollection = (name, values) => {
  collections[name] = values;
}

const getCollection = (name) => {
  return collections[name];
}

class BaseModel {
  constructor() { }

  use(object = new CollectionOption) {
    setCollection(this.constructor.name, {
      database: object.database || '',
      collection: object.collection || ''
    });
  }

  _getConfig() {
    return getCollection(this.constructor.name);
  }

  whereIn() {

  }

  where(opt = mongoORM.whereOptions) {
    mongoORM.addWhere(opt);
    return this;
  }

  async save(object) {
    await mongoORM.insert(object, this);
  }

  async get() {
    let data = await mongoORM.find(this);
    return new Collection(this, data);
  }

  async first() {

  }
}

module.exports = BaseModel;