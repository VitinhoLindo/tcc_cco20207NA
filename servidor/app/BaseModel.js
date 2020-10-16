const Mysql = require('../resource/lib/Mysql');

class BaseModel extends Mysql {
  constructor() { super(); }
}

module.exports = BaseModel;