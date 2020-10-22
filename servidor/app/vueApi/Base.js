const Fields = require('../../resource/fields/index');

class BaseApi {
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