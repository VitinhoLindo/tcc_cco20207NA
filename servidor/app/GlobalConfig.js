const Mongo = require('../resource/lib/MongoDB');

class GlobalConfig extends Mongo {
  constructor() {
    super();
    this.use({
      database: 'config',
      collection: 'person'
    });
  }
}

module.exports = GlobalConfig;