const { MongoClient } = require('mongodb');
const { Mongo: { MongoConnect } } = require('../../interface');

class Mongo {
  mongoConfig = MongoConnect;
  process = require('process');

  constructor() {
    this.readConfig();
  }

  readConfig() {
    this.mongoConfig.url = this.process.env.MONGO_URL;
    this.mongoConfig.port = this.process.env.MONGO_PORT;
    this.mongoConfig.auth.user = this.process.env.MONGO_USER;
    this.mongoConfig.auth.password = this.process.env.MONGO_PASS;

    if (!this.mongoConfig.url) this.mongoConfig.url = '127.0.0.1';
    if (!this.mongoConfig.port) this.mongoConfig.url = '27017';
    if (!this.mongoConfig.auth.user) delete this.mongoConfig.auth;
  }

  getConfig() {
    let base = `mongodb://${this.mongoConfig.url}:${this.mongoConfig.port}/`;
    
    return {
      url: (this.mongoConfig.auth.user && this.mongoConfig.auth.password) ? `${base}${this.mongoConfig.auth.user}:${this.mongoConfig.auth.password}`: base,
      options: {
        useNewUrlParser: this.mongoConfig.useNewUrlParser,
        useUnifiedTopology: this.mongoConfig.useUnifiedTopology
      }
    }
  }

  getClient() {
    let config  = this.getConfig();
    return new MongoClient(config.url, config.options);
  }

  async connection(Model) {
    let client = this.getClient();
    client = await client.connect();

    let dbAndCol = this.dbAndCol(Model, { client: client });
    return dbAndCol;
  }

  dbAndCol(Model, opt = { client: new MongoClient('') }) {
    let config = Model._getConfig() || { database: '', collection: '' };

    let db = opt.client.db(config.database);
    let collection = db.collection(config.collection);

    return {
      client: opt.client,
      db: db,
      collection: collection
    };
  }

  connectDbAndCollection(dbName = '', collName = '') {
    this.collection = this.client.db(dbName).collection(collName);
  }

  disconnect(opt = { client: new MongoClient('') }) {
    return new Promise(async (resolve) => {
      await opt.client.logout();
      await opt.client.close(true);
      resolve(true);
    });
  }
}

module.exports = Mongo;