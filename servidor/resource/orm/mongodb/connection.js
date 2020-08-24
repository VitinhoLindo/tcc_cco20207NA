const { MongoClient } = require('mongodb');
const { Mongo: { MongoConnect } } = require('../../interface');
const { pass } = require('../../interface/mongo/mongo-connect');

class Mongo {
  mongoConfig = MongoConnect;
  process = require('process');

  constructor() {
    this.readConfig();
    this.setBaseUrl();
    this.setClient();
  }

  readConfig() {
    this.mongoConfig.url = this.process.env.MONGO_URL;
    this.mongoConfig.port = this.process.env.MONGO_PORT;
    this.mongoConfig.auth.user = this.process.env.MONGO_USER;
    this.mongoConfig.auth.pass = this.process.env.MONGO_PASS;

    if (!this.mongoConfig.url) this.mongoConfig.url = '127.0.0.1';
    if (!this.mongoConfig.port) this.mongoConfig.url = '27017';
    if (!this.mongoConfig.auth.user) delete this.mongoConfig.auth;
  }

  setBaseUrl() {
    this.mongoConfig.connectionUrl = `mongodb://${this.mongoConfig.url}:${this.mongoConfig.port}`;
  }

  setClient() {
    this.client = new MongoClient(this.mongoConfig.connectionUrl, this.mongoConfig);
  }

  async connection() {
    await this.client.connect();
  }

  db(dbName = '') {
    this._db = this.client.db(dbName);
    return this;
  }

  collection(colName = '') {
    this._collection = this._db.collection(colName);
    return this;
  }

  connectDbAndCollection(dbName = '', collName = '') {
    this.collection = this.client.db(dbName).collection(collName);
  }

  async disconnect() {
    await this.client.logout();
    await this.client.close();
  }
}

module.exports = Mongo;