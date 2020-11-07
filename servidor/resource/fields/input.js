const Base = require('./Base');

class Input extends Base {
  response = {};

  constructor() { super(); }

  static make(label, field) {
    let input = new Input();

    input.set({
      name: 'input-component',
      shared: {
        label: label,
        attribute: (!field) ? label : field,
        type: "text",
        using: {},
        style: {},
        rules: ''
      }
    });

    return input;
  }

  using(values = {}) {
    let response = this.get();
    for (let key in values) { response.shared.using[key] = values[key]; }
    this.set(response);
    return this;
  }

  type(type = '') {
    let types = { pass: 'password', password: 'password', mail: 'email', email: "email" };
    if (!types[type]) throw `type input is not supported ${type}`;

    let response = this.get();
    response.shared.type = types[type];
    this.set(response);
    return this;
  }

  rules(value = '') {
    let response = this.get();
    response.shared.rules = value;
    this.set(response);
    return this;
  }

  protect(using = '') {
    let protectType = { hash: 'hash', encrypt: 'encrypt' }
    if (!protectType[using]) throw `protect type is not supported ${using}`;

    let response = this.get();
    response.shared.protect = using;
    this.set(response);
    return this;
  }

  set(value) {
    this.response = value;
  }

  get() {
    return this.response;
  }
}

module.exports = Input;