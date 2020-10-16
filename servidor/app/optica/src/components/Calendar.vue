<template>
  <div class="calendar">
    <div class="w-full flex-row flex-center">
      <div class="arrow-up"></div>
    </div>
    <div class="dates">
      <div class="apresentation">
        <div><h6 class="ds">{{ ds }}</h6></div>
        <div><h5 class="fy">{{ fy }}</h5></div>
      </div>
      <div class="internal-calendar">
        <div class="next-after">
          <div class="w1-10">
            <div class="w-full flex-row flex-center">
              <div class="arrow-left" @click="afterMonth"></div>
            </div>
          </div>
          <div class="month">{{ month }}</div>
          <div class="w1-10">
            <div class="w-full flex-row flex-center">
              <div class="arrow-right" @click="nextMonth"></div>
            </div>
          </div>
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
import DateMixin from '../mixins/date'

export default {
  name: 'Calendar',
  mixins: [LanguageMixin, DateMixin]
}
</script>