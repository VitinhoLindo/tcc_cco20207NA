// const { request, response } = require('express');
// const Storage   = require('../app/storage');
const Controller = require('./Controller');
const Login     = require('../models/Login');

class LoginController extends Controller {
    constructor( request, response) {
        super(request, response);
    }

    async readParams() {
        if (!this.request.body.login || !this.request.body.key) {
            this.response.status(400);
            return false;
        }
    }

    async getToken(login) {
        let dateObject = this.getDateObject(new Date());
        return await this.encrypt({
            encoding  : 'utf8',
            _encoding : 'hex',
            value     : `${login}-${dateObject.locale}`,
            date      : dateObject.date
        });
    }
    
    async login() {
        if (this.readParams()) {
            this.setHeader('Content-type', 'application/json');

            let [login, senha] = await Promise.all([
                this.hashable(this.request.body.login),
                this.hashable(this.request.body.key)
            ]);

            let _login = await (new Login).where('login', login).get();

            if (!_login.count())
                return this.formatResponse(404, 'failure in login', { message: '' }, true);                
            
            _login = _login.first();

            if (_login.login == login && _login.senha == senha) {
                let token = await this.getToken(login);
                return this.formatResponse(200, 'success', { token: token });
            } else {
                return this.formatResponse(404, 'failure in login', { message: '' }, true);
            }
        } else return true;
    }

    async auth() {
        if (this.request)
            this.login();
    }
}

module.exports = LoginController;