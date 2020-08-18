const createCollection = (model, value = []) => {
  var _values = [];
  let index = 0;

  while (value[index]) {
    let _value = value[index];

    let _model = new model.constructor();
    _model.use(model._getConfig());
    let keys = Object.keys(_value);

    for (let _index = 0, key; key = keys[_index]; _index++)
      _model[key] = _value[key];

    _values.push(_model);

    index++;
  }

  return _values;
}

class Collection {
  values = [];
  constructor(model, value) {
    this.values = createCollection(model, value);
  }

  count() { return this.values.length; }
  info() {
    return {
      min: 0,
      max: (this.values.length) ? this.values.length - 1 : 0
    };
  }

  // to upgrade;
  where() { }
  whereIn() { }
  whereNotIn() { }
  first() {
    let info = this.info();
    return this.values[info.min];
  }
  last() {
    let info = this.valueInfo();
    return this.values[info.max];
  }
}

module.exports = Collection;