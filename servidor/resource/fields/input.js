class Input {
  response = {};

  constructor() { }

  static make(label, field) {
    let input = new Input();

    input.set({
      field: 'input-component',
      label: label,
      attribute: (!field) ? label : field,
      using: {},
      rules: ''
    });

    return input;
  }

  using(values = {}) {
    let response = this.get();
    for (let key in values) { response.using[key] = values[key]; }
    this.set(response);
    return this;
  }

  rules(value = '') {
    let response = this.get();
    response.rules = value;
    this.set(response);
    return this;
  }

  protect(using = '') {
    let protectType = { hash: 'hash', encrypt: 'encrypt' }
    if (!protectType[using]) throw `protect type is not supported ${using}`;

    let response = this.get();
    response.protect = using;
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