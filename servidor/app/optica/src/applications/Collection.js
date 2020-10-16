class Collection {
  constructor(values = []) {
    this.values = values;
  }

  info() {
    return {
      initial: 0,
      final  : this.values.length
    };
  }

  count() {
    let info = this.info();
    return info.final;
  }

  where(field, value) {
    let values = [];

    try {
      for (let _value of this.values) {
        if (!_value[field]) continue;
        if (_value[field] == value) values.push(_value);
      }
    } catch (error) {
      console.error(error);
    }

    return new Collection(values)
  }

  get() {
    return new Collection(this.values);
  }

  first() {
    let info = this.info();
    return this.values[info.initial];
  }

  toArray() {
    return this.values;
  }

  last() {
    let info = this.info();

    if (info.final - 1 >= 0) info.final -= 1;
    return this.values[info.final];
  }
}

export default Collection;