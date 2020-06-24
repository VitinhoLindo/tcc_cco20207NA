const Controller = require('./Controller');
const Acesso     = require('../models/Acesso');

class LoginController extends Controller {
    acesso = new Acesso;

    constructor( request, response) {
        super(request, response);
    }

    async readParams() {
        if (!this.request.body.login || !this.request.body.key) {
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

            let acesso = await this.acesso.where({ column: 'login', value: login }).get();

            if (!acesso.count())
                return this.formatResponse(200, 404, 'failure in login', { message: '' }, true);                
            
            acesso = acesso.first();

            if (acesso.login == login && acesso.senha == senha) {
                let token = await this.getToken(login);
                return this.formatResponse(200, 200, 'success', { token: token });
            } else {
                return this.formatResponse(200, 404, 'failure in login', { message: '' }, true);
            }
        } else return this.formatResponse(200, 400, 'data is missing', { message: 'Informe o login ou senha' });
    }

    async analizeForgotem() {
        if (this.readParams()) {
            this.setHeader('Content-type', 'application/json');

            let login = await this.hashable(this.request.body.login);
        } else return this.formatResponse(200, 400, 'data is missing', { message: 'Informe o login ou senha' });
    }

    async auth() {
        if (this.request)
            this.login();
    }

    async forgotem() {
        if (this.request)
            this.analizeForgotem();
    }
}

module.exports = LoginController;