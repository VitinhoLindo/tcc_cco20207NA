const Controller = require('./controller');

class Main extends Controller {
  constructor() {
    super();
  }

  async onListen() {
    this.emit('server-open', { data: this.serverOptions });
  }

  async run() {
    this.Server.listen(this.serverOptions, this.onListen)
  }
}

(new Main).run();