const BaseController = require('../../resource/http/BaseController');
const Login = require('../../app/Login');
const AlterarSenha = require('../../app/AlterarSenha');
const Acesso = require('../../app/Login');

class ForgotemController extends BaseController {
  login = new Login();
  alterarSenha = new AlterarSenha();

  constructor(request, response) {
    super(request, response);
  }

  optionForgotem() {
    this.defaultResponseJSON({ result: { login: 'required|email|min:5' } });
    this.resEnd();
  }

  async getAlterKeyUsingAccess(acesso = new Acesso) {
    return await this.alterarSenha.where({ column: 'acesso', value: acesso.id }).where({ column: 'usaged_at', comparison: 'Is', value: null }).get();
  }

  correctCode(alterarSenha = new AlterarSenha, code) {
    if (alterarSenha.code == code) {
      return true;
    } else {
      return false;
    }
  }

  async getAccess(login = '') {
    return await this.login.where({ column: 'login', value: login })
                           .get();
  }

  async getSolicitationChangeKeyCode(login = new Login) {
    return await this.alterarSenha.where({ column: 'acesso', value: login.id })
                                  .where({ column: 'usaged_at', comparison: 'Is', value: null })
                                  .get();
  }

  async incorrectLogin() {
    this.defaultResponseJSON({
      result: {
        login: 'Login incorreto'
      }
    });
    this.resEnd();
  }

  async dontExistChangeKeySolicitation() {
    this.defaultResponseJSON({
      result: {
        error: {
          login: 'Não existe pedido de alteração de senha para este login'
        }
      }
    });
    this.resEnd();
  }

  async incorrectCode() {
    this.defaultResponseJSON({
      result: {
        error: {
          code: 'Código incorreto'
        }
      }
    });
    this.resEnd();
  }

  async setChangeKeyUsaged(alterarSenha = new AlterarSenha) {
    alterarSenha.usaged_at = new Date();
    await alterarSenha.save();
  }

  async setNewKey(acesso = new Login, key = '') {
    acesso.senha = await this.app.hashable(key);
    await acesso.save();
  }

  async getNewSolicitationChangeKeyCode(login = new Login) {
    return await this.alterarSenha.create({
      code: this.app.getRandom({ min: 999999, max: 9999999 }),
      acesso: login.id
    });    
  }

  async forgotem() {
    let validator = this.Validator.make(this.request.body, {
      login: 'required|email|min:5'
    }, {
      login: {
        required: 'e-mail é necessário',
        email: 'valor não tem padrão de e-mail',
        'min:5': 'valor de e-mail deve conter mais de 5 caracteres'
      }
    });

    if (validator.fails()) {
      this.defaultResponseJSON(validator.modelResponse());
      this.resEnd();
      return;
    }

    let _login = await this.app.hashable(this.request.body.login);
    let acesso = await this.getAccess(_login);

    if (!acesso.count()) {
      this.defaultResponseJSON({
        result: {
          error: {
            login: 'Não existe conta vinculada a este e-mail'
          }
        }
      });
      this.resEnd();
      return;
    } else acesso = acesso.first();
    let alter = await this.getSolicitationChangeKeyCode(acesso);

    if (!alter.count()) {
      alter = this.getNewSolicitationChangeKeyCode(acesso);
    } else alter = alter.first();

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
          value: alter.code
        },
        pathFile: this.app.dirFiles.getResourceMailerFile('forgotemCode.html')
      });

      this.defaultResponseJSON({
        result: {
          message: 'e-mail enviado contendo o código para troca da senha'
        }
      });
    } catch (error) {
      this.defaultResponseJSON({
        result: {
          error: {
            login: 'Não foi possível enviar e-mail para o e-mail informado'
          }
        }
      });
    }
    this.resEnd();
  }

  async forgotemCode() {
    let validator = this.Validator.make(this.request.body, {
      login: 'required|email|min:6',
      code: 'required|interger|min:6'
    }, {
      login: {
        required: 'e-mail é necessário',
        email: 'valor não tem padrão de e-mail',
        'min:5': 'valor de e-mail deve conter mais de 5 caracteres'
      },
      code: {
        required: 'O código é necessário',
        interger: 'O código deve ser numérico',
        'min:6': 'O código está incorreto'
      }
    })

    if (validator.fails()) {
      this.defaultResponseJSON(validator.modelResponse());
      this.resEnd();
      return;
    }

    let login = await this.app.hashable(this.request.body.login),
    acesso = await this.getAccess(login),
    alterarSenha;

    acesso = await this.getAccess(login);
    if (!acesso.count()) {
      this.incorrectLogin();
      return;
    } else acesso = acesso.first();
    
    alterarSenha = await this.getSolicitationChangeKeyCode(acesso);
    if (!alterarSenha.count()) {
      this.dontExistChangeKeySolicitation();
      return;
    } else alterarSenha = alterarSenha.first();

    if (!this.correctCode(alterarSenha, this.request.body.code)) {
      this.incorrectCode();
      return;
    } else {
      this.defaultResponseJSON({
        result: {
          message: 'Código verificado com sucesso'
        }
      });
      this.resEnd();
      return;
    }
  }

  async forgotemAlter() {
    let validator = this.Validator.make(this.request.body, {
      login: 'required|email|min:6',
      code: 'required|interger|min:6',
      key: 'required|string|min:6',
      newKey: 'required|string|min:6'
    }, {
      login: {
        required: 'e-mail é necessário',
        email: 'valor não tem padrão de e-mail',
        'min:5': 'valor de e-mail deve conter mais de 5 caracteres'
      },
      code: {
        required: 'O código é necessário',
        interger: 'O código deve ser numérico',
        'min:6': 'O código está incorreto'
      },
      key: {
        required: 'a chave é necessária',
        string: 'formato deve ser caracteres',
        'min:6': 'minimo é 6 caracteres'
      },
      newKey: {
        required: 'a confirmação da chave é necessaria',
        string: 'formato deve ser caracteres',
        'min:6': 'minimo é 6 caracteres'
      }
    });

    if (validator.fails()) {
      this.defaultResponseJSON(validator.modelResponse());
      this.resEnd();
      return;
    }

    let login = await this.app.hashable(this.request.body.login),
    acesso = await this.getAccess(login);

    if (!acesso.count()) {
      this.incorrectLogin();
      return;
    } else acesso = acesso.first();

    
    let alterarSenha = await this.getSolicitationChangeKeyCode(acesso);
    if (!alterarSenha.count()) {
      this.dontExistChangeKeySolicitation();
      return;
    } else alterarSenha = alterarSenha.first();

    if (!this.correctCode(alterarSenha, this.request.body.code)) {
      this.incorrectCode();
      return;
    }

    if (this.request.body.key != this.request.body.newKey) {
      this.defaultResponseJSON({
        result: {
          error: {
            newKey: 'cofirmação da senha está diferente da senha'
          }
        }
      });
      this.resEnd();
      return;
    }

    await Promise.all([
      this.setChangeKeyUsaged(alterarSenha),
      this.setNewKey(acesso, this.request.body.key)
    ]);

    this.defaultResponseJSON({
      result: {
        message: 'senha alterada com sucesso'
      }
    });
    this.resEnd();
  }
}

module.exports = ForgotemController;