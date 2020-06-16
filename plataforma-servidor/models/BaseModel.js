const Storage        = require('../app/storage');
const { Collection } = require('./util');
const { MySql }      = require('../modules');

class BaseModel {
    table = '';

    constructor() {}

    isArray(value) {
        if (value == undefined) return false;
        return value.constructor.name == 'Array';
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

        }
    }

    buildJoin() {
        let joinFields = this.getJoinFields();
        if (this.isArray(joinFields)) {}
    }

    endQuery() {
        this.query += ';';
    }

    select(...args) {
        this.selectFields = args;
        return this;
    }

    where(...args) {
        this.whereFields = args;
        return this;
    }

    async get() {
        this.query = 'select ';
        this.buildSelect();
        this.buildTable();
        this.buildWhere();
        this.buildJoin();
        this.endQuery();

        let values = await (new MySql).executeQuery(this.query);
        delete this.query;
        return new Collection(this, values);
    }
}

module.exports = BaseModel;