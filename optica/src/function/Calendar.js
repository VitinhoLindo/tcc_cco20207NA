import Language from './Language'

class Calendar extends Language {
  constructor() { super(); }

  getDateObject(date = new Date()) {
    let [day, month, year] = date.toLocaleDateString().split(/\-|\//);
    return {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day)
    };
  }

  async getDates(opt = { year: 0, month: 0 }) {
    var date = new Date(opt.year, opt.month - 1, 1);
    var days = [];

    while (date.getMonth() == opt.month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  getLastMonth(year = 0, month = 0) {
    let object = { year: year, month: month };

    if (month - 1 == 0) {
      object.year = object.year - 1;
      object.month = 12;
    } else {
      object.month = object.month - 1;
    }

    return object;
  }

  getNextMonth(year = 0, month = 0) {
    let object = { year: year, month: month };

    if (month + 1 == 13) {
      object.year = object.year + 1;
      object.month = 1;
    } else {
      object.month = object.month + 1;
    }

    return object;
  }

  getLastDays(calendar = [], current = [], last = []) {
    let collection = new this.Collection(current);
    let info = collection.info(),
      initial = current[info.min],
      gmt = this.getGMT(new Date(initial)),
      len,
      lenLast = last.length;

    if (gmt == 'mon') len = 1
    if (gmt == 'tue') len = 2
    if (gmt == 'wed') len = 3
    if (gmt == 'thu') len = 4
    if (gmt == 'fri') len = 5
    if (gmt == 'sat') len = 6
    if (gmt == 'sun') len = 7

    for (let x = lenLast - len; x < lenLast; x++) {
      calendar.push(last[x]);
    }

    for (let index in current) {
      let value = current[index];
      calendar.push(value);
    }
  }

  getNextDays(calendar = [], next = []) {
    let count = 0;

    while (true) {
      if (calendar.length == 42) break;
      calendar.push(next[count]);
      count++;
    }
  }

  getGMT(date = new Date(), full = false) {
    let [DS, D, M, Y, H, CPM] = date.toGMTString().replace(/\,/, '').split(/\s/g);

    if (full) return { DS, D, M, Y, H, CPM };
    else return DS.toLowerCase();
  }

  getObjectDays(calendar = []) {
    let object = {
      sun: { label: 'D', values: [] },
      mon: { label: 'S', values: [] },
      tue: { label: 'T', values: [] },
      wed: { label: 'Q', values: [] },
      thu: { label: 'Q', values: [] },
      fri: { label: 'S', values: [] },
      sat: { label: 'S', values: [] },
    };

    calendar.forEach((day) => {
      let date = new Date(day),
        gmt = this.getGMT(date);

      object[gmt].values.push(date.getDate());
    });

    return object;
  }

  async getCalendar(date = new Date()) {
    let object = this.getDateObject(date),
      lastDateObject = this.getLastMonth(object.year, object.month),
      nextDateObject = this.getNextMonth(object.year, object.month),
      calendar = [];

    let [current, last, next] = await Promise.all([
      this.getDates(object),
      this.getDates(lastDateObject),
      this.getDates(nextDateObject)
    ]);

    this.getLastDays(calendar, current, last);
    this.getNextDays(calendar, next);

    return this.getObjectDays(calendar);
  }

  getCurrentDateString(date = new Date()) {
    let h = date.getHours();
    let m = date.getMinutes();

    let dateObject = this.getGMT(date, true);

    return {
      Day: parseInt(dateObject.D),
      Month: dateObject.M,
      HM: `${h}:${m}`,
      Y: dateObject.Y
    };
  }

  createDateUsingObject(date = { year: 2020, month: 1, day: 1 }) {
    return new Date(`${date.year}-${date.month}-${date.day}`);
  }

  getSeccondsUsingMinute(time = 1) {
    time = parseInt(time) || 1;
    return time * 60;
  }

  getMillisecondsUsingMinute(time = 1) {
    time = this.getSeccondsUsingMinute(time);
    return time * 1000;
  }
}

export default Calendar;