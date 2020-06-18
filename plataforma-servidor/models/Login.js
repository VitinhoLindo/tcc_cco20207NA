const BaseModel = require('./BaseModel');

class Login extends BaseModel {
    table     = 'Acesso';
    timestamp = true;
    
    constructor() {
        super();
    }
}

module.exports = Login;