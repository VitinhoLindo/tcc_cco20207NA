const { Collection } = require('./util');
const { MySql }      = require('../modules');

class BaseModel {
    table     = '';
    timestamp = false;

    constructor() {}

    isArray(value) {
        if (value == undefined) return false;
        return value.constructor.name == 'Array';
    }

    inArray(value, array = []) {
        return array.indexOf(value) >= 0;
    }

    valueInKeysObject(value = '', object = {}) {
        return this.inArray(value, Object.keys(object));
    }

    getSelectFields() {
        if (this.selectFields && this.isArray(this.selectFields)) {
            let selectFields = this.selectFields.slice();
            delete this.selectFields;
            return selectFields;
        } else return '*';
    }

    buildSelect() {
        let selectFields = this.getSelectFields();
        if (this.isArray(selectFields)) {
            for (let index = 0; index < selectFields.length; index++) {
                let value = selectFields[index];

                if (index == selectFields.length -1) this.query += `${value} `;
                else this.query += `${value}, `;
            }
        } else this.query += `${selectFields} `;
    }

    buildTable() {
        this.query += `from \`${this.table}\` `;
        delete this.table;
    }

    getWhereFields() {
        if (this.whereFields && this.isArray(this.whereFields)) {
            let whereFields = this.whereFields.slice();
            delete this.whereFields;
            return whereFields;
        } else return '';
    }

    getJoinFields() {
        if (this.joinFields && this.isArray(this.joinFields)) {
            let joinFields = this.joinFields.slice();
            delete this.joinFields;
            return joinFields;
        } else return '';
    }

    buildWhere() {
        let whereFields = this.getWhereFields();
        if (this.isArray(whereFields)) {
            this.query += ` where ( `;

            for (let index = 0; index < whereFields.length; index++) {
                let _value = whereFields[index];

                if (index == whereFields.length -1) this.query += ` \`${_value.field}\` = '${_value.value}'`;
                else this.query += ` \`${_value.field}\` = '${_value.value}',`;
            }

            this.query += ` )`;
        }
    }

    buildJoin() {
        let joinFields = this.getJoinFields();
        if (this.isArray(joinFields)) {}
    }

    endQuery() {
        this.query += ';';
    }

    setCast(type, key) {
        if (type == 'save') {

        }
        if (type == 'get') {
            
        }
    }

    buildCast(type) {
        return (delete this.cast);
    }

    buildTimestamp() {
        if (this.timestamp) {
            if (!this.id) this.created_at = (new Date()).toLocaleString();
            else this.updated_at          = (new Date()).toLocaleString();
        }
        delete this.timestamp;
    }

    buildColumns() {
        var query = `${this.query}( `;
        delete this.table;
        delete this.query;
        let keys = Object.keys(this);
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];

            if (index == keys.length - 1) query += `\`${key}\` `;
            else query += `\`${key}\`, `;
        }
        query += ") ";
        this.query = query;
        this.keys  = keys ;
    }

    buildValues() {
        this.query += 'VALUES ( ';

        for(let index = 0; index < this.keys.length; index++) {
            let key = this.keys[index];

            if (index == this.keys.length - 1) this.query += `'${this[key]}' `;
            else this.query += `'${this[key]}', `;
        }

        this.query += ');';
        delete this.keys;
    }

    hasMany(Model = BaseModel, field) {
        let _Model = new Model();
        return _Model.where(field, this.id || null);
    }

    belongsTo(Model = BaseModel, field) {
        let _Model = new Model();
        return _Model.where('id', this[field]);
    }

    async save() {
        this.query = `INSERT INTO \`${this.table}\` `;

        this.buildTimestamp();
        this.buildCast('save');
        this.buildColumns();
        this.buildValues();

        let data   = await (new MySql).executeQuery(this.query);
        delete this.query;
        this.id    = data.insertId;
    }

    select(...args) {
        this.selectFields = args;
        return this;
    }

    where(...args) {
        if (this.isArray(this.whereFields)) this.whereFields.push({ field: args[0], value: args[1] });
        else this.whereFields = [{ field: args[0], value: args[1] }];
        return this;
    }

    async get() {
        this.query = 'select ';

        this.buildCast('get');
        this.buildSelect();
        this.buildTable();
        this.buildWhere();
        this.buildJoin();
        this.endQuery();

        let values = await (new MySql).executeQuery(this.query);
        console.log(values);
        delete this.query;
        return new Collection(this, values);
    }
}

module.exports = BaseModel;