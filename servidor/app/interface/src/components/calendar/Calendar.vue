<template>
  <div class="calendar" v-if="internal.on" v-bind:style="internal.style">
    <div class="internal">
      <div class="month-div">
        <div class="back" v-on:click="backMonth" v-if="yearOn">{{ backyear }}</div>
        <div class="month">
          {{ labels.month }}
        </div>
        <div class="next" v-on:click="nextMonth" v-if="yearOn">{{ nextyear }}</div>
      </div>

      <div class="calendar-div" v-if="labels.daysShow">
        <div class="day" v-for="(key, index) in days" v-bind:key="index">
          <div class="prefix">{{ dayPrefix(key) }}</div>
          <div class="value" v-for="(day, _index) in dayValues(key)" v-bind:key="_index">{{ day }}</div>
        </div>
      </div>
    </div>

    <div class="style">
      <div v-bind:style="internal.stylezable"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    variables: {
      type: Object,
      required: true
    },
    configs: {
      type: DOMRect,
      required: true
    }
  },
  data() {
    return {
      labels: {
        date: new Date(),
        yearNumber: 0,
        monthNumber: 0,
        month: '',
        days: {},
        daysShow: false
      },
      internal: {
        on: false,
        configs: {
          width: 300,
          height: 270,
          spacingY: 1,
          spacingX: 120
        },
        style: {},
        stylezable: {},
        config: {}
      }
    };
  },
  mounted() {
    this.randle();
  },
  methods: {
    async randle() {
      this.setConfig();
      this.setCalendar(new Date());
      this.internal.on = true;
    },
    getDay(object) {
      return object.dia;
    },
    setConfig() {
      if (this.configs == this.config) return;
      this.config = this.configs;
      let { bottom, height, left, right, top, width, x, y } = this.configs;

      this.internal.style.left = `${x - (this.internal.configs.width - this.internal.configs.spacingX)}px`;
      this.internal.style.top  = `${y - (this.internal.configs.height - this.internal.configs.spacingY)}px`;
      this.internal.stylezable.margin = `0px ${this.internal.configs.width - (this.internal.configs.spacingX * 0.7)}px`;
    },

    backMonth() {
      this.labels.monthNumber--;

      if (this.labels.monthNumber == 0) {
        this.labels.yearNumber--;
        this.labels.monthNumber = 12;
      }

      this.setCalendar(new Date(`${this.labels.yearNumber}-${this.labels.monthNumber}-1`));
    },
    nextMonth() {
      this.labels.monthNumber++;
  
      if (this.labels.monthNumber == 13) {
        this.labels.yearNumber++;
        this.labels.monthNumber = 1;
      }

      this.setCalendar(new Date(`${this.labels.yearNumber}-${this.labels.monthNumber}-1`));
    },
    getCalendar() {
      class Calendar {
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
        
          while(date.getMonth() == opt.month - 1) {
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

        arrayInfo(value = []) {
          return {
            min: 0,
            max: (value.length) ? value.length  -1 : 0
          }
        }

        getLastDays(calendar = [], current = [], last = []) {
          let info = this.arrayInfo(current),
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

          while(true) {
            if (calendar.length == 42) break;
            calendar.push(next[count]);
            count++;
          }
        }

        getGMT(date = new Date()) {
          let [DS, D, M, Y, H, CPM] = date.toGMTString().replace(/\,/, '').split(/\s/g);
          return DS.toLowerCase();
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
            gmt  = this.getGMT(date);

            object[gmt].values.push(date.getDate());
          });

          return object;
        }

        async getCalendar(date = new Date()) {
          let object = this.getDateObject(date),
          lastDateObject = this.getLastMonth(object.year, object.month),
          nextDateObject = this.getNextMonth(object.year, object.month),
          calendar = [];

          let [current, last, next ] = await Promise.all([
            this.getDates(object),
            this.getDates(lastDateObject),
            this.getDates(nextDateObject)
          ]);

          this.getLastDays(calendar, current, last);
          this.getNextDays(calendar, next);

          return this.getObjectDays(calendar);
        }
      }

      return new Calendar();
    },
    async setCalendar(date = new Date()) {
      this.labels.days = {};
      this.labels.date = date;
      this.labels.yearNumber  = date.getFullYear();
      this.labels.monthNumber = date.getMonth() + 1;
      this.labels.month = this.getMonthName(date);

      let calendar = this.getCalendar();

      this.labels.daysShow = false;
      this.labels.days = await calendar.getCalendar(date);
      this.labels.daysShow = true;
    },
    getMonthName(date = new Date()) {
      let [DS, D, M, Y, H, CPM] = date.toGMTString().replace(/\,/, '').split(/\s/g);
      return M;
    },
    dayPrefix(key) {
      return this.labels.days[key].label;
    },
    dayValues(key) {
      return this.labels.days[key].values;
    }
  },
  computed: {
    yearOn() {
      let keys = Object.keys(this.labels.days);
      return !!keys.length;
    },
    days() {
      return Object.keys(this.labels.days);
    },
    backyear() {
      return (this.labels.monthNumber == 1) ? this.labels.yearNumber - 1 : this.labels.yearNumber;
    },
    nextyear() {
      return (this.labels.monthNumber == 12) ? this.labels.yearNumber + 1 : this.labels.yearNumber;
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 5;
  width: 300px;
  height: 270px;

  .internal {
    -webkit-border-radius: 5px;
    width: 100%;
    height: 260px;
    background-color: #2c3e50;

    .month-div {
      width: 92%;
      display: flex;
      border-bottom: 1px solid #ffffff;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 5px;

      .back  {
        width: 25%;
        font-size: 20px;
        text-align: center;
        vertical-align: middle;
        line-height: 30px;
        color: #ffffff;
        cursor: pointer
      }
      .back:hover {
        opacity: 0.8;
        background-color: rgba($color: #405468, $alpha: 0.8);
      }
      .month {
        font-size: 20px;
        text-align: center;
        vertical-align: middle;
        width: 50%;
        line-height: 30px;
        color: #ffffff;
      }
      .next  {
        width: 25%;
        font-size: 20px;
        text-align: center;
        vertical-align: middle;
        line-height: 30px;
        color: #ffffff;
        cursor: pointer
      }
      .next:hover {
        opacity: 0.8;
        background-color: rgba($color: #405468, $alpha: 0.8);
      }
    }

    .calendar-div {
      width: 95%;
      padding: 5px 0px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: auto;

      .day {
        width: 14%;
        margin: auto;
        display: flex;
        flex-direction: column;

        .prefix {
          margin-bottom: 30px;
        }

        div {
          font-size: 16px;
          text-align: center;
          vertical-align: middle;
          width: 32px;
          line-height: 22px;
          margin: 2px auto;
          color: #ffffff;
          -webkit-border-radius: 5px;
        }

        .value {
          cursor: pointer;
        }
        .value:hover {
          background-color: rgba($color: #405468, $alpha: 0.8);
        }
      }
    }
  }

  .style {
    width: 300px;
    height: 10px;

    div {
      width: 20px;
      height: 10px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: #2c3e50;
    }
  }
}
</style>