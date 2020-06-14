const { request, response } = require('express');
const { MySql } = require('../modules');
const Storage = require('../app/storage');

class LoginController extends Storage {
    constructor(_request = request, _response = response) {
        super();
        if (_request && _response) {
            this.request  = _request;
            this.response = _response;
    
            this._dirname_ = this.request._dirname_;
        }
    }

    async readParams() {
        if (!this.request.body.login || !this.request.body.key) {
            this.response.status(400);
            return false;
        }
    }
    
    async login() {
        if (this.readParams()) {
            // let encrypted = await this.encrypt({ 
            //     date: new Date(), 
            //     value: this.request.body.key,
            //     encoding: 'utf8',
            //     _encoding: 'hex'
            // });
            // console.log(`insert into \`Acesso\` (\`login\`, \`senha\`, \`created_at\`) values ('${this.request.body.login}', '${encrypted}', '${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}');`);
            // let result = await this.MySqlModule.queryAsync(`insert into \`Acesso\` (\`login\`, \`senha\`, \`created_at\`) values ('${this.request.body.login}', '${encrypted}', '${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}');`);
            // console.log(result);
            // let decrypted = await this.decrypt({
            //     date: new Date(), 
            //     value: encrypted,
            //     encoding: 'utf8',
            //     _encoding: 'hex'
            // });
        } else return true;
    }

    async on() {
        if (this.request)
            this.login();
    }

    async end() {
        this.response.end();
    }
}

module.exports = LoginController;