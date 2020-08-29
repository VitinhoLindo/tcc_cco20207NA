const { MongoClient } = require('mongodb');
const { Mongo: { MongoConnect } } = require('../../interface');

// let server = process.env.MONGO_URL,
//   port = process.env.MONGO_PORT,
//   user = process.env.MONGO_USER,
//   password = process.env.MONGO_PASS;

// options.useNewUrlParser = true;
// options.useUnifiedTopology = true;
// options.keepAlive = true;
// options.autoReconnect = true;

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
    let base = `mongodb://${this.mongoConfig.auth.user}:${this.mongoConfig.auth.password}@${this.mongoConfig.url}:${this.mongoConfig.port}/`;
    
    return {
      url: base,
      options: {
        useNewUrlParser: this.mongoConfig.useNewUrlParser,
        useUnifiedTopology: true
      }
    }
  }

  async find(arg = {
    dbName: '',
    collectionName: '',
    query: {},
    select: {},
    project: {}
  }) {
    const config = this.getConfig();
    const client = await (new MongoClient(config.url, config.options)).connect();
    const collection = client.db(arg.dbName).collection(arg.collectionName);
    var doc = [];

    if (arg.project) {
      doc = collection.find(arg.query, arg.select || {}).project(arg.project).toArray();
    } else {
      doc = collection.find(arg.query, arg.select || {}).toArray();
    }

    await client.close();
    return doc;
  }

  async insert(arg = {
    dbName: '',
    collectionName: '',
    doc: {}
  }) {
    const config = this.getConfig();
    const client = await (new MongoClient(config.url, config.options)).connect();
    const collection = client.db(arg.dbName).collection(arg.collectionName);
    var result;

    if (arg.doc)
      result = await collection.insert(arg.doc)

    await client.close();
    return result;
  }
}

module.exports = Mongo;