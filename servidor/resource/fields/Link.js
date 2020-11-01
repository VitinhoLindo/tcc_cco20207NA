class Button {
  response = {};

  constructor() { }

  static make(label) {
    let button = new Button();

    button.set({
      name: 'link-component',
      shared: {
        label: label,
        using: {
          class: 'link'
        }
      }
    });

    return button;
  }

  event(value = '') {
    let response = this.get();

    response.shared.event = value;
    this.set(response);
    return this;
  }

  action(value = '') {
    let response = this.get();

    if (!response.shared.action) response.shared.action = {};
    response.shared.action.actionName = value;

    this.set(response);
    return this;
  }

  changeField(value = '') {
    let response = this.get();

    if (!response.shared.action) response.shared.action = {};
    response.shared.action.fieldName = value;

    this.set(response);
    return this;
  }

  path(value = '', method = 'GET') {
    let response = this.get();
    method = method.toUpperCase();

    if (!response.shared.action) response.shared.action = {}; 
    response.shared.action.path = value;
    response.shared.action.method = method;

    this.set(response);
    return this;
  }

  class(value = '') {
    let classes = { danger: 'button-danger' };

    if (!classes[value]) throw `class button is not supported ${value}`;
    let response = this.get();

    response.shared.using.class = value;
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

module.exports = Button;