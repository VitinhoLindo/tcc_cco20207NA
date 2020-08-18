const Collection = require('./Collection');
const { MYSQL } = require('../orm');
const { Mysql: { TableOption } } = require('../interface');

var table = '';
var timestamp = false;
var cast = {};
var softDelete = false;
const mysqlORM = new MYSQL;

const arrayInfo = function (array = []) {
  let len = array.length;
  return {
    min: 0,
    max: (len) ? len - 1 : 0
  };
}

const arrayValue = function (index, array = []) {
  return array[index] || null;
}

class BaseModel {
  constructor() { }

  use(object = new TableOption) {
    table = object.table || null;
    cast = object.cast || null;
    timestamp = object.timestamp || false;
    softDelete = object.softDelete || false;
  }

  _getConfig() {
    return {
      table: table,
      cast: cast,
      timestamp: timestamp,
      softDelete: softDelete
    };
  }

  table() {
    return table;
  }

  timestamp() {
    return timestamp;
  }

  softDelete() {
    return softDelete;
  }

  cast() {
    return cast;
  }

  select(...args) {
    mysqlORM.addSelect(args);
    return this;
  }

  where(opt = new mysqlORM.whereOption()) {
    mysqlORM.addWhere(opt);
    return this;
  }

  join(opt = new mysqlORM.joinOption()) {
    mysqlORM.addJoin(opt);
    return this;
  }

  async save() {
    let query = mysqlORM.getSaveQuery(this);

    let res = await mysqlORM.executeQuery(query);
    if (res.insertId) this.id = res.insertId;
    return true;
  }

  async get() {
    let query = mysqlORM.buildSELECTQuery(this);
    let value = await mysqlORM.executeQuery(query);
    return new Collection(this, value);
  }

  async delete() {
    let query = mysqlORM.buildDELETEQuery(this);

    await mysqlORM.executeQuery(query);
    return true;
  }

  async first() {
    let value = await this.get();

    let info = arrayInfo(value.values);
    return arrayValue(info.min, value.values);
  }

  async last() {
    let value = await this.get();

    let info = arrayInfo(value.values);
    return arrayValue(info.max, value.values);
  }

  // to Update;
  async belongsTo() { }
  async hasMany() { }
}

module.exports = BaseModel;