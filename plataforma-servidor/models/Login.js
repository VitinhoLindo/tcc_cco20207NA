const BaseModel = require('./BaseModel');

class Login extends BaseModel {
    constructor() {
        super();
        this.use({
            table: 'Acesso',
            timestamp: true
        })
    }
}

module.exports = Login;