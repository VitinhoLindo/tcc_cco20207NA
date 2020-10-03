<template>
  <div class="super-bar">
    <div class="activitie">{{ language.labels['activities-label'] }}</div>
    <div class="calendar-date">

    </div>
  </div>
</template>

<script>
import LanguageMixin from '../mixins/language'

export default {
  name: 'SuperBar',
  mixins: [LanguageMixin]
}
</script>