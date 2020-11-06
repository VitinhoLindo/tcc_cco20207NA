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
    let validator = this.Validator.make({ keys: 'required|array', date: 'required|datetime' });

    if (validator.fails()) {
      return this.defaultResponseJSON(validator.modelResponse());
    }

    let all = this.all();
    this.app.setCache(this.request.socket.remoteAddress, { keys: all.keys, date: new Date(all.date) });
    

    this.defaultResponseJSON({ result: null });
    this.resEnd();
  }
}

module.exports = SyncController;