const { MongoClient } = require('mongodb');

class Mongo {
  host = '127.0.0.1';
  port = '27017';
  baseUrl = '';

  constructor() {
    this.setBaseUrl();
    this.setClient();
  }

  setBaseUrl() {
    this.baseUrl = `mongodb://${this.host}:${this.port}`;
  }

  setClient() {
    this.client = new MongoClient(this.baseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
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