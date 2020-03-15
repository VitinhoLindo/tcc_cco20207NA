const { EventEmitter } = require('events');

class MyEvent extends EventEmitter {
  constructor() {
    super();
  }
}

module.exports = MyEvent;