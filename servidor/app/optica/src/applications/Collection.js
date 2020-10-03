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

  get() {
    return new Collection(this.values);
  }

  first() {
    let info = this.info();
    return this.values[info.initial];
  }

  last() {
    let info = this.info();

    if (info.final - 1 >= 0) info.final -= 1;
    return this.values[info.final];
  }
}

export default Collection;