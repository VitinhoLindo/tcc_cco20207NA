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

            let acesso = await this.acesso.where({ column: 'login', value: login })
                                          .where({ column: 'senha', value: senha })
                                          .first();
            if (!acesso) return this.formatResponse({ 
                responseCode: 200, 
                requestCode: 404, 
                message: 'failure in login',  
                result: { message: 'Login ou senha incorreto' },
                status: true
            });

            let token = await this.getToken(login);
            return this.formatResponse({
                responseCode: 200,
                requestCode: 200,
                message: 'success authentication',
                result: { token: token }
            });
        } else return this.formatResponse({
            responseCode: 200,
            requestCode: 400,
            message: 'data is missing',
            result: { message: 'Informe o login ou senha' },
            status: true
        });
    }

    async analizeForgotem() {
        if (this.readParams()) {
            let login = await this.hashable(this.request.body.login);
            let acesso = this.acesso.where({column: 'login', value: login}).first();
            if (!acesso) return this.formatResponse({
                responseCode: 200,
                requestCode: 404,
                message: 'dont found',
                result: { message: 'E-mail informado não existe' },
                status: true
            });

            try {
                await this.sendMail({ 
                    from    : this.request.body.login,
                    subject : 'Alterar senha',
                    text    : '',
                    html    : '',
                    replace : {
                        type   : 'html',
                        regexp : '@code@',
                        value  : this.random(100000, 999999)
                    },
                    _pathFile  : `${this._dirname_}${this.dirFiles.sistemMail.dir}/emailCode.html`
                });
                return this.formatResponse({
                    responseCode: 200,
                    requestCode: 200,
                    message: 'message send with success',
                    result: { message: 'E-mail enviado com o código para atualização da senha', awaitCode: true }
                })
            } catch (error) {
                return this.formatResponse({
                    responseCode: 200,
                    requestCode: 500,
                    message: 'internal sever error',
                    result: { message: 'Não foi possivel enviar e-mail para o e-mail informado' },
                    status: true
                });
            }
        } else return this.formatResponse({
            responseCode: 200,
            requestCode: 400,
            message: 'data is missing',
            result: { message: 'Informe seu e-mail' },
            status: true
        });
    }

    async forgotemMessage() {
        return this.formatResponse({
            responseCode: 200,
            requestCode: 200,
            message: 'success in response message',
            result: { message: 'Por favor informe seu e-mail.' }
        });
    }

    async auth() {
        if (this.request)
            this.login();
    }

    async forgotem() {
        if (this.request)
            this.analizeForgotem();
    }

    async getForgotemMessage() {
        if (this.request)
            this.forgotemMessage();
    }
}

module.exports = LoginController;