<template>
  <div class="content">
    <span class="date" @click="calendar">
      {{ date }}
    </span>

    <calendar v-if="open" />
  </div>
</template>

<script>
import DateMixin from '../mixins/date';
import LanguageMixin from '../mixins/language'

export default {
  name: 'Date',
  mixins: [DateMixin, LanguageMixin],
  data() {
    return {
      open: false
    };
  },
  methods: {
    calendar() {
      this.open = !this.open;
    }
  }
}
</script>