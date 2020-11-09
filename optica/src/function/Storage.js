import Cache from './Cache'

class Storage extends Cache {
  constructor() {
    super();
  }

  getStorage(key, parser = 'json') {
    try {
      let value = this.storage.getItem(key);

      if (parser == 'json')
        return JSON.parse(value);
      else
        return value;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  saveStorage(key, value, parser = 'json') {
    try {
      if (parser == 'json')
        value = JSON.stringify(value);

      this.storage.setItem(key, value);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteStorage(key) {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  readStorage() {
    for (let key of this.storageDefault) {
      this.saveCache(key, this.getStorage(key, 'json') || {});
    }
  }
}

export default Storage;