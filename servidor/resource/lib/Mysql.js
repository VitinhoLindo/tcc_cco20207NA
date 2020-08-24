const Collection = require('./Collection');
const { MYSQL } = require('../orm');
const { Mysql: { TableOption } } = require('../interface');


var tables = {};

const mysqlORM = new MYSQL;

const setTableOptions = (name, values) => {
  tables[name] = values;
}

const getTableOptions = (name) => {
  return tables[name];
}

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
    setTableOptions(this.constructor.name, {
      table : object.table || null,
      cast : object.cast || null,
      timestamp : object.timestamp || false,
      softDelete : object.softDelete || false
    });
  }

  _getConfig() {
    return getTableOptions(this.constructor.name);
  }

  table() {
    let internal = getTableOptions(this.constructor.name);
    return internal.table;
  }

  timestamp() {
    let internal = getTableOptions(this.constructor.name);
    return internal.timestamp;
  }

  softDelete() {
    let internal = getTableOptions(this.constructor.name);
    return internal.softDelete;
  }

  cast() {
    let internal = getTableOptions(this.constructor.name);
    return internal.cast;
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

  async create(value = {}) {
    for (let key in value) {
      this[key] = value[key];
    }
    return await this.save();
  }

  async save() {
    let query = mysqlORM.getSaveQuery(this);

    let res = await mysqlORM.executeQuery(query);
    if (res.insertId) this.id = res.insertId;
    return this;
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