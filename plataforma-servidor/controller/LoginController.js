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
            let [login, senha] = await Promise.all([
                this.hashable(this.request.body.login),
                this.hashable(this.request.body.key)
            ]);

            let acesso = await this.acesso.where({ column: 'login', value: login }).where({ column: 'senha', value: senha }).first();
            if (!acesso) return this.formatResponse(200, 404, 'failure in login', { message: 'Login ou Senha Incorreto' }, true);

            let token = await this.getToken(login);
            return this.formatResponse(200, 200, 'success', { token: token });
        } else return this.formatResponse(200, 400, 'data is missing', { message: 'Informe o login ou senha' });
    }

    async analizeForgotem() {
        if (this.readParams()) {
            let login = await this.hashable(this.request.body.login);
            let acesso = this.acesso.where({column: 'login', value: login}).first();
            if (!acesso) return this.formatResponse(200, 404, '', { message: 'E-mail informado não existe' });

            try {
                // await this.sendMail({ });
                return this.formatResponse(200, 200, 'Success', { message: 'E-mail enviado, verifique o seu e-mail, nele deve conter o código para troca de senha.' });
            } catch (error) {
                return this.formatResponse(200, 500, 'Internal Server Error', { message: 'Não foi possível enviar e-mail para o e-mail informado' }, true);
            }
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