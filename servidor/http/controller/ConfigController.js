const BaseController = require('../../resource/http/BaseController');
const GlobalConfig = require('../../app/GlobalConfig');

class ConfigController extends BaseController {
  globalConfig = new GlobalConfig();
  constructor(request, response) { super(request, response); }

  async get() {
    // await this.globalConfig.save({
    //   home: {
    //     image: {
    //       src: this.request.body.src
    //     }
    //   }
    // });
    let data = await this.globalConfig.where({ column: 'identify', value: 'default' }).get();
    data = data.first();
    delete data._id;
    delete data.identify;
    this.defaultResponseJSON({
      result: data
    });
    this.resEnd();
  }
}

module.exports = ConfigController;