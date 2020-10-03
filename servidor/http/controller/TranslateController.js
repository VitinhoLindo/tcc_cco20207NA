const BaseController = require('../../resource/http/BaseController');

class TranslateController extends BaseController {
  constructor(request, response) { 
    super(request, response); 
    this.defaultLang = 'pt-BR';
  }

  async options() {
    this.defaultResponseJSON({
      result: {
        lang: 'required|string|min:2'
      }
    });
    this.resEnd();
    return;
  }

  async get() {
    let validator = this.Validator.make(this.request.query, {
      lang: 'required|string|min:2'
    }, {
      appNames: {
        required: 'lang é necessário',
        string: 'formato deve ser string',
        'min:1': 'tamanho minimo de 2 é requerido'
      }
    });

    if (validator.fails()) {
      this.defaultResponseJSON(validator.modelResponse());
      return;
    }

    try {
      let res = await this.app.fileExists('utf-8', this.app.dirFiles.getPublicLangPath(`${this.request.query.lang}.json`));
      return this.defaultResponseJSON({ result: JSON.parse(res.fileContent) });
    } catch (error) {
      let res = await this.app.fileExists('utf-8', this.app.dirFiles.getPublicLangPath(`${this.defaultLang}.json`));
      return this.defaultResponseJSON({ result: JSON.parse(res.fileContent) });
    }  
  }
}

module.exports = TranslateController;