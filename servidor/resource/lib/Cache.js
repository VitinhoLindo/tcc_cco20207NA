const Storage = require('./Storage');

class Cache extends Storage {
  cacheData = {};

  constructor() { super(); }

  getCache(index) {
    return this.cacheData[index] || null;
  }

  setCache(index, value) {
    if (!this.cacheData[index]) this.cacheData[index] = {};
    if (!value) return;

    if (value.constructor.name == 'Object') {
      this.cacheData[index] = Object.assign({}, this.cacheData[index], value);
    } else {
      this.cacheData[index] = value;
    }
  }

  async getUser(request) {
    if (!request.headers['authorization']) return null;

    let user = await this.decrypt({ encoding: 'utf8', _encoding: 'hex', value: request.headers['authorization'], date: new Date() });
    console.log(user);
  }
}

module.exports = Cache;