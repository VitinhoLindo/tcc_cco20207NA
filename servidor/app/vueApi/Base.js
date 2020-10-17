const Field = require('../../resource/fields/Field');
const Fields = require('../../resource/fields/index');

class BaseApi extends Field {
  constructor() {
    super();
  }

  render() {
    let fields = this.fields();

    for (let index in fields) {
      let field = fields[index];
      fields[index] = field.get();
    }

    return fields;
  }
}

module.exports = {
  BaseApi,
  Fields
};