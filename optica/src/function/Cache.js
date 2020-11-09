import Event from './Event'

class Cache extends Event {
  constructor() {
    super();
    this.cache = {};
  }

  saveCache(index, value, time) {
    this.cache[index] = value;

    if (time) {
      time = parseFloat(time) || 1;
      time *= 1000;
      setTimeout(() => {
        this.delete(index);
      }, time);
    }
  }

  deleteCache(index) {
    if (!this.cache[index]) return false;
    delete this.cache[index];
    return true;
  }

  getCache(index) {
    return this.data[index] || null;
  }
}

export default Cache;