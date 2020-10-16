const Mongo = require('../resource/lib/MongoDB');

class GlobalConfig extends Mongo {
  constructor() {
    super();
    this.use({
      database: 'apps',
      collection: 'configuration'
    });
  }
}

module.exports = GlobalConfig;