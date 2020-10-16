const BaseController = require('../../resource/http/BaseController');
const Login = require('../../app/Login');
const SolicitacaoAcesso = require('../../app/SolicitacaoAcesso');

class LoginController extends BaseController {
  login = new Login();
  solicitacaoAcesso = new SolicitacaoAcesso();

  constructor(request, response) {
    super(request, response);
  }

  option() {
    this.defaultResponseJSON({ result: { login: 'required|email|min:5', key: 'required|string|min:5' } });
    this.resEnd();
  }

  async getAccess(login = '') {
    return await this.login.where({ column: 'login', value: login })
                           .get();
  }

  correctKey(login = new Login, key) {
    return login.senha == key
  }

  correctCode(solicitacaoAcesso =  new SolicitacaoAcesso, code) {
    return solicitacaoAcesso.code == code;
  }

  async getSolicitationLogin(login = new Login) {
    return await this.solicitacaoAcesso.where({ column: 'acesso', value: login.id })
                                       .where({ column: 'usaged_at', comparison: 'Is', value: null })
                                       .get();
  }

  async setUsagedAtSolicitationAccess(solicitacaoAcesso = new SolicitacaoAcesso) {
    solicitacaoAcesso.usaged_at = new Date();
    await solicitacaoAcesso.save();
  }

  /** @param update */
  async getAuth(login = new Login, solicitacaoAcesso = new SolicitacaoAcesso) {
    return '12345678';
  }

  async createNewSolicitationLogin(login = new Login) {
    return await this.solicitacaoAcesso.create({
      code: this.app.getRandom({ min: 999999, max: 9999999 }),
      acesso: login.id
    });
  }

  async dontFoundAccess() {
    this.defaultResponseJSON({
      result: {
        error: {
          login: 'Não existe conta com este e-mail'
        }
      }
    });
    this.resEnd();
  }

  async incorrectKey() {
    this.defaultResponseJSON({
      result: {
        error: {
          key: 'login ou senha incorreto'
        }
      }
    });
    this.resEnd();
  }

  async incorrectCode() {
    this.defaultResponseJSON({
      result: {
        error: {
          code: 'código inválido'
        }
      }
    });
    this.resEnd();
  }



  async singIn() {
    let validator = this.Validator.make(this.request.body, {
      login: 'required|email|min:5',
      key: 'required|string|min:5',
    }, {
      login: {
        required: 'A informação do login é necessária para o login',
        email: 'A informação do login não contém padrão de e-mail',
        'min:5': 'A informação do login não é maior que 5 characteres'
      },
      key: {
        required: 'A informação da key é necessária para o login',
        string: 'O tipo de informação de key não é string',
        'min:5': 'A informação de key não é maior que 5 characteres'
      }
    });

    if (validator.fails()) {
      this.defaultResponseJSON(validator.modelResponse());
      this.resEnd();
      return;
    }

    const [login, key] = await Promise.all([
      this.app.hashable(this.request.body.login),
      this.app.hashable(this.request.body.key)
    ]);

    let _login = await this.getAccess(login);

    if (!_login.count()) {
      this.dontFoundAccess();
      return;
    } else _login = _login.first();

    if (this.correctKey(_login, key)) {
      let solicitacaoAcesso = await this.getSolicitationLogin(_login);

      if (!solicitacaoAcesso.count()) {
        solicitacaoAcesso = await this.createNewSolicitationLogin(_login);
      } else solicitacaoAcesso = solicitacaoAcesso.first();

      try {
        await this.app.sendMail({
          from: this.request.body.login,
          subject: 'Alterar senha',
          text: '',
          html: '',
          fileContent: 'utf-8',
          replace: {
            type: 'html',
            regexp: '@code@',
            value: solicitacaoAcesso.code
          },
          pathFile: this.app.dirFiles.getResourceMailerFile('loginCode.html')
        });

        this.defaultResponseJSON({
          result: {
            success: true
          }
        });
      } catch (error) {
        this.defaultResponseJSON({
          result: {
            error: {
              login: 'Não foi possível enviar o código para login, tente novamente mais tarde.'
            }
          }
        });
      }
    } else this.incorrectKey();
  }

  async singInCode() {
    let validator = this.Validator.make(this.request.body, {
      login: 'required|email|min:5',
      key: 'required|string|min:5',
      code: 'required|interger|min:5'
    }, {
      login: {
        required: 'A informação do login é necessária para o login',
        email: 'A informação do login não contém padrão de e-mail',
        'min:5': 'A informação do login não é maior que 5 characteres'
      },
      key: {
        required: 'A informação da key é necessária para o login',
        string: 'O tipo de informação de key não é string',
        'min:5': 'A informação de key não é maior que 5 characteres'
      },
      code: {
        required: 'O código é necessário para efetuar o login',
        interger: 'código incorreto',
        'min:5': 'código incorreto'
      }
    });

    if (validator.fails()) {
      this.defaultResponseJSON(validator.modelResponse());
      this.resEnd();
      return;
    }
    
    const [login, key] = await Promise.all([
      this.app.hashable(this.request.body.login),
      this.app.hashable(this.request.body.key)
    ]);

    let _login = await this.getAccess(login);

    if (!_login.count()) {
      this.defaultResponseJSON({
        result: {
          error: {
            login: 'Não existe conta com este e-mail'
          }
        }
      });
      this.resEnd();
      return;
    } else _login = _login.first();

    if (this.correctKey(_login, key)) {
      let solicitacaoAcesso = await this.getSolicitationLogin(_login);

      if (!solicitacaoAcesso.count()) {
        return this.incorrectCode();
      } else solicitacaoAcesso = solicitacaoAcesso.first();

      if (this.correctCode(solicitacaoAcesso, this.request.body.code)) {
        await this.setUsagedAtSolicitationAccess(solicitacaoAcesso);
        this.defaultResponseJSON({
          result: {
            auth: await this.getAuth(_login, solicitacaoAcesso) // criar um token para envio
          }
        });
        this.resEnd();
        return;
      } else return this.incorrectCode();
    } else this.incorrectKey();
  }
}

module.exports = LoginController;