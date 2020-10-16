class WhereOption {
  column = '';
  value = '';
  comparison = '';

  constructor(opt) {
    if (opt) {
      this.column = opt.column;
      this.value = opt.value;
      this.comparison = opt.comparison;
    }
  }

  getColumn() { return this.column; }
  getValue() { return this.value; }
  getComparison() { return this.comparison || '='; }
}

module.exports = WhereOption;