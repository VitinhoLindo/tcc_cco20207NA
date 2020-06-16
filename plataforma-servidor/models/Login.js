const BaseModel = require('./BaseModel');

class Login extends BaseModel {
    table = 'Acesso';

    cast = {
        login      : 'encrypt',
        senha      : 'hash',
        created_at : 'date'
    };
    
    constructor() {
        super();
    }

    select(...args) {

    }

    where(...args) {

    }

    async get() {
    }

    async first() {
    }
}

module.exports = Login;