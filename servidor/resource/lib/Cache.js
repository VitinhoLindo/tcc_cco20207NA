const Storage = require('./Storage');

class Cache extends Storage {
  constructor() { super(); }

  async getUser(request) {
    if (!request.headers['authorization']) return null;

    let user = await this.decrypt({ encoding: 'utf8', _encoding: 'hex', value: request.headers['authorization'], date: new Date() });
    console.log(user);
  }
}

module.exports = Cache;