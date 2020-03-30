const Controller = require('./controller');

class Main extends Controller {
  constructor() {
    super();
  }

  async onListen() {
    console.log(`http://${this.serverOptions.host}:${this.serverOptions.port}/`);
    this.emit('server-open', { data: this.serverOptions });
  }

  async run() {
    this.Server.listen(this.serverOptions, this.onListen())
  }
}

(new Main).run();