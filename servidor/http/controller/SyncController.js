const BaseController = require('../../resource/http/BaseController');

class SyncController extends BaseController {

  constructor(request, response) { super(request, response); }

  static estance() {
    return SyncController;
  }

  async option() {
    return this.defaultResponseJSON({ message: 'secret key' });
  }

  async post() {
    let validator = this.Validator.make({ publicKey: 'required|string', date: 'required|datetime' });

    if (validator.fails()) {
      return this.defaultResponseJSON(validator.modelResponse());
    }

    let all = this.all();
    let { key, date } = await this.app.serverExportPublicKey();

    this.app.setCache(this.request.socket.remoteAddress, {
      publicKey: await this.app.serverImportPublicKey(all.publicKey),
      date: new Date(all.date)
    });

    this.defaultResponseJSON({ result: { key, date } });
    this.resEnd();
  }
}

module.exports = SyncController;