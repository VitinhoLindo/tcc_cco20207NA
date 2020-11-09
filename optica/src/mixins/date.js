export default {
  mounted() {
    this.listenDate();
    this.initialDate();
    this.listen();
    setInterval(() => {
      this.listenDate();
    }, this.$app.timeInterval);
  },
  data() {
    return {
      date: '',
      ds: '',
      fy: '',
      data: {
        year: 0,
        month: 0,
        day: 1
      },
      days: null,
      month: ''
    };
  },
  methods: {
    listen() {
      this.$app.on('body-click', () => {
        this.open = false;
      });
    },
    listenDate() {
      let option = this.$app.getCurrentDateString();
      this.date = `${option.Day}` +
        ` ${this.language.labels['of'] || ''}` +
        ` ${this.language.labels[option.Month.toLowerCase()] || option.Month}` +
        ` ${option.HM}`;

      this.fy = `${option.Day}` +
        ` ${this.language.labels['of']}` +
        ` ${this.language.labels[`month-${option.Month}`.toLowerCase()] || option.Month}` +
        ` ${this.language.labels['of']}` +
        ` ${option.Y}`;

      let gmt = this.$app.getGMT(new Date, true);
      this.ds = this.language.labels[`day-${gmt.DS}`.toLowerCase()] || '';
    },
    async initialDate(obj) {
      if (!obj) {
        let date = new Date();
        date = this.$app.getDateObject(date);
        delete date.day;

        for (let key in date) this.data[key] = date[key];
      } else for (let key in obj) this.data[key] = obj[key];

      let date = this.$app.createDateUsingObject(this.data);

      let gmt = this.$app.getGMT(date, true);

      this.month = `${this.language.labels[`month-${gmt.M}`.toLowerCase()] || gmt.M} - ${gmt.Y}`;
      this.days = await this.$app.getCalendar(date);
    },
    afterMonth() {
      this.days = null;
      let year = this.data.year, month;
      if (this.data.month - 1 == 0) {
        year -= 1;
        month = 12;
      } else month = this.data.month - 1;

      this.initialDate({ year: year, month: month });
    },
    nextMonth() {
      this.days = null;
      let year = this.data.year, month;
      if (this.data.month + 1 == 13) {
        year += 1;
        month = 1;
      } else month = this.data.month + 1;

      this.initialDate({ year: year, month: month });
    }
  }
}