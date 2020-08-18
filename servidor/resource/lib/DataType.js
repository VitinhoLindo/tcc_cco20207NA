const Repository = require('./Repository');

class DataType extends Repository {
  constructor() { super(); }

  getDateObject(date = new Date()) {
    return {
      date: date,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      seccond: date.getSeconds(),
      locale: date.toLocaleDateString(),
      utc: `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
    };
  }
}

module.exports = DataType;