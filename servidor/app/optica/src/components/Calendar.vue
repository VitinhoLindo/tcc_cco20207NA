<template>
  <div class="calendar">
    <div class="show"></div>
    <div class="dates">
      <div class="apresentation">
        <div><h6 class="ds">{{ ds }}</h6></div>
        <div><h5 class="fy">{{ fy }}</h5></div>
      </div>
      <div class="internal-calendar">
        <div class="next-after">
          <div class="after" @click="afterMonth"></div>
          <div class="month">{{ month }}</div>
          <div class="next" @click="nextMonth"></div>
        </div>

        <div v-if="days" class="days">
          <div v-for="(value, index) of days" :key="index" class="day-list">
            <div class="label">{{ value.label }}</div>
            <button v-for="(day, index) of value.values" :key="index" class="day">
              {{ day }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageMixin from '../mixins/language'
import DateMixin from '../mixins/date';

export default {
  name: 'Calendar',
  mixins: [LanguageMixin, DateMixin]
}
</script>