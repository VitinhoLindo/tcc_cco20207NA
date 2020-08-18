const Connection = require('./connection');
const { Mysql: { Option: { JoinOption, WhereOption } } } = require('../../interface');

class MysqlOrm {
  orm = new Connection;
  selectFields = [];
  whereFields = [];
  joinFields = [];
  joinOption = JoinOption;
  whereOption = WhereOption;

  constructor() { }

  async executeQuery(query = '') {
    this.clearCache();
    try {
      if (query) return this.orm.executeQuery(query);
      else return [];
    } catch (error) {
      return [];
    }
  }

  addWhere(opt) { this.whereFields.push(opt); }
  addJoin(opt) { this.joinFields.push(opt); }
  addSelect(array = []) { this.selectFields = this.selectFields.concat(array); }

  clearCache() {
    this.selectFields = [];
    this.whereFields = [];
    this.joinFields = [];
  }

  fieldString(value) {
    if (/\./g.test(value)) {
      let [table, column] = value.split('.');
      return `\`${table}\`.\`${column}\``;
    } else return `\`${value}\``;
  }

  isArray(value) {
    if (value === undefined) return false;
    return value.constructor.name == 'Array';
  }

  arrayInfo(value = []) {
    return {
      min: 0,
      max: value.length
    };
  }

  arrayValue(index = 0, array = []) {
    return array[index] || null;
  }

  inArray(value, array = []) {
    return array.indexOf(value) >= 0;
  }

  unsetObject(field, object = {}) {
    if (object[field] !== undefined) delete object[field];
    else throw "field is not exists";
    return object;
  }

  unsetArray(value, array = []) {
    if (inArray(value, array)) {
      let index = array.indexOf(value);
      array.splice(index, 1);
      return array;
    } else return array;
  }

  buildSELECTQuery(model) {
    let selectFields = this.getSelectFields();
    let joinFields = this.getSelectJoin();
    let whereFields = this.getWhereFields();

    let query = `SELECT ${selectFields} ` +
      ` FROM ${this.fieldString(model.table())}` +
      ` ${joinFields} `;

    if (model.softDelete()) {
      whereFields += ((whereFields) ? ',' : '') + ` ${this.fieldString('deleted_at')} != Null `;
    }
    if (whereFields) query += `WHERE ( ${whereFields} ) ;`;
    return query;
  }

  buildUPDATEQuery(model) {
    model = this.buildTimestamp('update', model);
    let whereArguments = '';
    let setArguments = '';

    if (!this.whereFields.length)
      this.whereFields.push(new WhereOption({ column: 'id', value: model.id }));
    const id = model.id;
    model = this.unsetObject('id', model);
    let keys = Object.keys(model);

    whereArguments = this.getWhereFields();

    let info = this.arrayInfo(keys);
    for (let x = 0, field; field = keys[x]; x++) {
      setArguments += ` ${this.fieldString(field)} = ${this.getTypeValue(model[field])}`;

      if (info.max - 1 != x) {
        setArguments += ',';
      }
    }

    model.id = id;
    return `UPDATE ${this.fieldString(model.table())} SET ${setArguments}  WHERE ( ${whereArguments} );`;
  }

  buildINSERTQuery(model) {
    model = this.buildTimestamp('insert', model);
    let keys = Object.keys(model);

    let fieldArguments = '';
    let valueArguments = '';

    let info = this.arrayInfo(keys);
    for (let x = 0, field; field = keys[x]; x++) {
      fieldArguments += `${this.fieldString(field)}`;
      valueArguments += `${this.getTypeValue(model[field])}`;

      if (info.max - 1 !== x) {
        fieldArguments += ',';
        valueArguments += ',';
      }
    }

    return `INSERT INTO ${this.fieldString(model.table())} ` +
      `(${fieldArguments}) VALUES (${valueArguments});`;
  }

  buildTimestamp(type = '', model) {
    if (model.timestamp()) {
      if (type.toUpperCase() == 'UPDATE') model.updated_at = new Date;
      else model.created_at = new Date;
    }
    return model
  }

  buildDELETEQuery(model) {
    if (model.softDelete()) {
      if (!model.id) throw "failure in delete model";
      model.deleted_at = new Date();
      return this.buildUPDATEQuery(model);
    }

    if (!this.whereFields.length) {
      if (!model.id) throw "failure in delete model";
      this.whereFields.push(new WhereOption({ column: 'id', value: model.id }));
    }

    let whereFields = this.getWhereFields();
    return `DELETE FROM ${this.fieldString(model.table())} WHERE ( ${whereFields} );`;
  }

  getSaveQuery(model) {
    if (model.id) return this.buildUPDATEQuery(model);
    else return this.buildINSERTQuery(model);
  }

  getSelectJoin() {
    var joinString = '';

    var info = this.arrayInfo(this.joinFields);
    if (info.max) {
      let value;
      for (let x = 0; value = this.joinFields[x]; x++) {
        value = new JoinOption(value);
        joinString += ` INNER JOIN ${this.fieldString(value.getTargetTable())}` +
          ` ON ${this.fieldString(value.getTargetAndColumn())}` +
          ` ${value.getComparison()}` +
          ` ${this.fieldString(value.getCurrentTableAndColumn())} `;
      }
    }

    return joinString;
  }

  getSelectTable() {
    return ` FROM ${fieldString(table)}`;
  }

  getTypeValue(value) {
    if (value === undefined) return 'Null';
    if (value === null) return 'Null';
    switch (value.constructor.name) {
      case 'Date': return `'${value.toLocaleString()}'`;
      case 'String': return `'${value}'`;
      case 'Number': return `${value}`;
      case 'Array': return `"${JSON.stringify(value)}"`;
      case 'Object': return `"${JSON.stringify(value)}"`;
      default: throw "Type no\'t suported";
    }
  }

  getSelectFields() {
    var selectString = '';
    var info = this.arrayInfo(this.selectFields);
    if (info.max) {
      let field;
      for (let x = 0; field = this.selectFields[x]; x++) {
        if (info.max - 1 == x) selectString += ` ${this.fieldString(field)}`;
        else selectString += ` ${this.fieldString(field)},`;
      }
      return selectString;
    } else return '*';
  }

  getWhereQuery(opt = new WhereOption) {
    return ` ${this.fieldString(opt.getColumn())}` +
      ` ${opt.getComparison()}` +
      ` ${this.getTypeValue(opt.getValue())}`;
  }

  getWhereFields() {
    var whereString = '';
    var info = this.arrayInfo(this.whereFields);

    if (info.max) {
      let where;
      for (let x = 0; where = this.whereFields[x]; x++) {
        where = new WhereOption(where);
        if (info.max - 1 == x) whereString += `${this.getWhereQuery(where)} `;
        else whereString += `${this.getWhereQuery(where)} AND `;
      }
    }

    return whereString;
  }
}

module.exports = MysqlOrm;