const Connection = require('./connection');
const { Mongo: { Options: { WhereOption } } } = require('../../interface');

class MongoOrm {
  orm = new Connection();
  whereOptions = new WhereOption();
  whereFields = [];
  whereInFields = [];

  constructor() { }

  addWhereIn(opt = this.whereOptions) { this.whereInFields.push(opt); }
  addWhere(opt = this.whereOptions) { this.whereFields.push(opt); }

  clearCache() {
    this.whereFields = [];
    this.whereInFields = [];
  }

  buildSelectIn() {
    let object = {};

    this.whereInFields.forEach((opt) => {
      object[opt.column] = {
        $in: opt.value
      }
    });

    return object;
  }

  buildSelectQuery() {
    let object = {};

    this.whereFields.forEach((opt) => {
      object[opt.column] = opt.value;
    });

    return object;
  }

  queryBuilder() {
    let object = {};

    if (this.whereInFields.length) {
      object = Object.assign({}, object, this.buildSelectIn());
    }
    if (this.whereFields.length) {
      object = Object.assign({}, object, this.buildSelectQuery());
    }

    return object;
  }

  async find(Model) {
    let query = this.queryBuilder();
    this.clearCache();

    let config = Model._getConfig()
    return await this.orm.find({ 
      dbName: config.database, 
      collectionName: config.collection,
      query: query
    });
  }

  async insert(data, Model) {
    this.clearCache();
    let config = Model._getConfig();

    let result = await this.orm.insert({
      dbName: config.database,
      collectionName: config.collection,
      doc: data
    });

    return result.ops;
  }
}

module.exports = MongoOrm;