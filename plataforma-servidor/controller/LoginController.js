const Controller = require('./Controller');
const { Login, AlterarSenha }     = require('../models');

class LoginController extends Controller {
    acesso  = new Login();
    alterar = new AlterarSenha();
    
    constructor( request, response) {
        super(request, response);
    }

    readParams(type = '') {
        switch(type) {
            case 'login':
                if (!this.request.body.login || !this.request.body.key)
                    return false;
                return true;
            case 'forgotem':
                if (!this.request.body.login)
                    return false;
                return true;
            case 'forgotemCode':
                if (!this.readParams('forgotem')) return false;
                if (!this.request.body.code) return false;
                return true;
            case 'redefine': 
                if (!this.readParams('forgotemCode')) return false;
                if (!this.request.body.newKey && this.request.body.newKeyConfirm) return false;
                return true;
            default: 
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
        if (this.readParams('login')) {
            let [login, senha] = await Promise.all([
                this.hashable(this.request.body.login),
                this.hashable(this.request.body.key)
            ]);

            let acesso = await (new Login).where({ column: 'login', value: login })
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

    async validateForgotemCode() {
        if (this.readParams('forgotemCode')) {
            var { login, code } = this.request.body;
            
            login = await this.hashable(this.request.body.login);
            let value = await (new AlterarSenha).select('AlterarSenha.*')
                                          .where({ column: 'Acesso.login', value: login })
                                          .where({ column: 'usage_at', comparison: 'Is', value: null })
                                          .join({
                                              tableTarget: 'Acesso', tableTargetAndColumn: 'Acesso.id',
                                              comparison: '=', currentTableAndColumn: 'AlterarSenha.acesso'
                                          }).first();

            if (!value) return this.formatResponse({
                responseCode: 200,
                requestCode: 404,
                message: 'dont found',
                result: {
                    message: 'E-mail não solicitou alteração de senha'
                },
                status: true
            });

            if (value.code != code) return this.formatResponse({
                responseCode: 200,
                requestCode: 200,
                message: 'sucesso',
                result: {
                    message: 'Código inválido.'
                },
                status: true
            });

            return this.formatResponse({
                responseCode: 200,
                requestCode: 200,
                message: 'sucesso',
                result: {
                    message: 'Código recebido com sucesso.',
                    awaitNewKey: true
                }
            });
        } else return this.formatResponse({
            responseCode: 200,
            requestCode: 400,
            message: 'data is missing',
            result: { message: 'Informe o código' },
            status: true
        });
    }

    async sendMailForgotem(code) {
        await this.sendMail({ 
            from    : this.request.body.login,
            subject : 'Alterar senha',
            text    : '',
            html    : '',
            replace : {
                type   : 'html',
                regexp : '@code@',
                value  : code
            },
            _pathFile  : `${this._dirname_}${this.dirFiles.sistemMail.dir}/emailCode.html`
        });
    }

    async validateRedefineKey() {
        if (this.readParams('redefine')) {
            var { login, newKey, newKeyConfirm } = this.request.body;

            if (newKey.lenght <= 5 || newKeyConfirm.lenght <= 5) this.formatResponse({
                responseCode: 200,
                requestCode: 400,
                message: 'length key not suported',
                result: { message: 'A senha deve conter mais de 5 caracteres' },
                status: true
            });
            if (newKey != newKeyConfirm) this.formatResponse({
                responseCode: 200,
                requestCode: 400,
                message: 'keys is not equal',
                result: { message: 'A senha e a confirmação da senha não são iguais' },
                status: true
            });

            var [ _login, _senha ] = await Promise.all([
                this.hashable(login),
                this.hashable(newKey)
            ]);

            let value = await (new AlterarSenha).select('AlterarSenha.*')
                                                .where({ column: 'Acesso.login', value: _login })
                                                .where({ column: 'usage_at', comparison: 'Is', value: null })
                                                .join({
                                                    tableTarget: 'Acesso', tableTargetAndColumn: 'Acesso.id',
                                                    comparison: '=', currentTableAndColumn: 'AlterarSenha.acesso'
                                                }).first();

            if (!value) return this.formatResponse({
                responseCode: 200,
                requestCode: 404,
                message: 'dont found',
                result: {
                    message: 'E-mail não solicitou alteração de senha'
                },
                status: true
            });

            let acesso = await (new Login).where({ column: 'id', value: value.acesso }).first();
            acesso.senha = _senha;
            await acesso.save();

            value = await (new AlterarSenha).where({ column: 'id', value: value.id }).first();
            value.usage_at = new Date();
            await value.save();

            return this.formatResponse({
                responseCode: 200,
                requestCode: 200,
                message: 'success',
                result: { message: 'Senha alterada' }
            });
        } else return this.formatResponse({
            responseCode: 200,
            requestCode: 400,
            message: 'data is missing',
            result: { message: 'Preencha os campos' },
            status: true
        });
    }

    async analizeForgotem() {
        if (this.readParams('forgotem')) {
            let login = await this.hashable(this.request.body.login);
            var acesso = await (new Login).where({column: 'login', value: login}).first();
            if (!acesso) return this.formatResponse({
                responseCode: 200,
                requestCode: 404,
                message: 'dont found',
                result: { message: 'E-mail informado não existe' },
                status: true
            });

            try {
                let code = this.random(100000, 999999);
                let alterarSenha = new AlterarSenha();
                let _alterarSenha = await alterarSenha.where({ column: 'acesso', value : acesso.id }).where({ column: 'usage_at', comparison : 'Is', value: null }).first();

                if (!_alterarSenha) {
                    alterarSenha.code   = code;
                    alterarSenha.acesso = acesso.id;
                    await alterarSenha.save();
                } else code = _alterarSenha.code;

                await this.sendMailForgotem(code);
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

    async forgotemCode() {
        if (this.request)
            this.validateForgotemCode();
    }

    async redefineKey() {
        if (this.request) 
            this.validateRedefineKey();
    }
}

module.exports = LoginController;