const Connection = require('./connection');
const { Mongo: { Options: { WhereOption } } } = require('../../interface');

class MongoOrm {
  orm = new Connection();
  whereOptions = new WhereOption();
  whereFields = [];

  constructor() { }

  addWhere(opt = this.whereOptions) { this.whereFields.push(opt); }

  clearCache() {
    this.whereFields = [];
  }

  buildSelectQuery() {
    let object = {};

    this.whereFields.forEach((opt) => {
      object[opt.column] = opt.value;
    });

    return object;
  }

  find(Model) {
    return new Promise(async (resolve, reject) => {
      let query = this.buildSelectQuery();
      this.clearCache();

      let client = await this.orm.connection(Model);

      client.collection.find(query).toArray(async (err, result) => {
        await this.orm.disconnect(client);

        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  insert(data, Model) {
    return new Promise(async (resolve, reject) => {
      this.clearCache();

      let client = await this.orm.connection(Model);
      
      client.collection.insertOne(data, async (err, result) => {
        this.orm.disconnect(client);

        if (err) reject(err);
        else resolve(result.ops);
      });
    });
  }
}

module.exports = MongoOrm;