class Storage {
  constructor() {
    this.storage = window.localStorage;
  }

  get(key, parser = 'json') {
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

  save(key, value, parser = 'json') {
    try {
      if (parser == 'json')
        value = JSON.stringify(value);

      this.storage.setItem(key, value);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  delete(key) {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new Storage;