const { Collection } = require('./util');
const { MySql }      = require('../modules');

var table      = '';
var timestamp  = false;
var cast       = {};
var softDelete = false;
const mysqlORM = new MySql;

const arrayInfo = function(array = []) {
    let len = array.length;
    return {
        min: 0,
        max: (len) ? len - 1 : 0
    };
}

const arrayValue = function(index, array = []) {
    return array[index] || null;
}

class BaseModel {
    constructor() {}

    use(object = {}) {
        table      = object.table      || null;
        cast       = object.cast       || null;
        timestamp  = object.timestamp  || false;
        softDelete = object.softDelete || false;
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

        let res = await mysqlORM.executeQuery(query);
        return true;
    }

    async first() {
        let value = await this.get();

        let info  = arrayInfo(value.values);
        return arrayValue(info.min, value.values);
    }

    async last () {
        let value = await this.get();

        let info  = arrayInfo(value.values);
        return arrayValue(info.max, value.values);
    }

    async belongsTo() {}
    async hasMany() {}
}

module.exports = BaseModel;