class ValidatorOption {
  failed = false
  rule = '';
  message = '';
}

const isArray = (value) => {
  const _isArray = (_value) => {
    if (_value.constructor.name == 'Array') return true;
    return false;
  }
  var bool = false, count = 1, end = 4, autoBreak = false;

  while (!bool) {
    if (count == end) break;
    if (autoBreak) break;

    switch (count) {
      case 1:
        if (!dataExists(value))
          autoBreak = true;
        break;
      case 2:
        if (isString(value))
          try {
            value = JSON.parse(value);
          } catch (error) {
            autoBreak = true;
          }
        break;
      case 3:
        if (_isArray(value)) bool = true;
        break;
      default: break;
    }

    count++;
  }

  return bool;
}

const dataExists = (value) => {
  if (value == undefined) return false;
  if (value == null) return false;
  return true;
}

const lenValue = (rule, value, opt) => {
  let _len = value.length;
  if (!isString(rule)) return false;
  if (!value) return false;
  if (_len == undefined) return false;

  let exec = /\d+/g.exec(rule);
  if (!exec) return false;
  exec = parseInt(exec);

  switch (opt) {
    case 'min':
      if (_len < exec) return false;
      else return true;
    case 'max':
      if (_len > exec) return false;
      else return true;
    default:
      return false;
  }
}

const isUrlEncode = (value) => {
  if (!isString(value)) return false;
  if (/data\:image\/\w+\;base64\,\s/g.test(data) == true) return true;
  else return false;
}

const isString = (value) => {
  if (!dataExists(value)) return false;
  if (typeof value == 'string') return true;
  return false;
}

const isDate = (value) => {
  if (!dataExists(value)) return false;
  var count = 1, end = 3;
  let bool = false;

  while (!bool) {
    if (count == end) break;
    switch (count) {
      case 1:
        if (value.constructor.name == 'Date') bool = true;
        break;
      case 2:
        if (!isString(value)) break;
        if (/\d+\-\d+-\d+T\d+:\d+:\d+\.\d+Z$/.test(value) == true) bool = true;
        break;
    }
    count++;
  }

  return bool;
}

class Validator {
  failed = false;
  rule = '';
  message = '';

  constructor(opt = new ValidatorOption()) {
    this.failed = opt.failed;
    this.rule = opt.rule;
    this.message = opt.message;
  }

  fails() {
    return this.failed;
  }

  modelResponse() {
    return {
      code: 400,
      message: this.message || 'failed in request'
    }
  }

  static validate(data, rules = undefined | []) {
    for (let x = 0, rule; rule = rules[x]; x++) {
      if (rule == 'required') {
        if (!dataExists(data)) return { failed: true, rule: rule };
      } else if (rule == 'string') {
        if (!isString(data)) return { failed: true, rule: rule, ruleMessage: `not string` };
      } else if (rule == 'array') {
        if (!isArray(data)) return { failed: true, rule: rule };
      } else if (/^min\:\d+$/.test(rule)) {
        if (!lenValue(rule, data, 'min')) return { failed: true, rule: rule };
      } else if (/^max\:\d+$/.test(rule)) {
        if (!lenValue(rule, data, 'max')) return { failed: true, rule: rule };
      } else if (rule == 'url-encode') {
        if (!isUrlEncode(data)) return { failed: true, rule: rule };
      } else if (rule == 'datetime') {
        if (!isDate(data)) return { failed: true, rule: rule };
      }
    }

    return { failed: false };
  }

  static errorMessage(field, rule, message) {
    let _message = `this ${field} is @complement@`;

    if (message) { return _message.replace(/\@complement\@/g, message); }
    else { return _message.replace(/\@complement\@/g, rule); }
  }

  static make(data = {}, opt = {}) {
    let controller = {
      failed: false,
      rule: undefined,
      message: undefined
    };

    if (data == undefined) controller.failed = true;
    else if (data.constructor.name != 'Object') controller.failed = true;
    if (opt == undefined) controller.failed = true;
    else if (opt.constructor.name != 'Object') controller.failed = true;

    if (controller.failed) return new Validator(controller);
    for (let field in opt) {
      let result = this.validate(data[field], opt[field].split(/\|/g));
      controller.failed = result.failed;

      if (controller.failed) {
        controller.rule = result.rule;
        controller.message = this.errorMessage(field, result.rule, result.ruleMessage);
        break;
      }
    }

    return new Validator(controller);
  }
}

module.exports = Validator;