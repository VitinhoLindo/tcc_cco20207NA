<template>
  <div class="super-bar">
    <div class="activitie"><span>{{ language.labels['activities-label'] }}</span></div>
    <div class="options">
      <date />
    </div>
    <div class="super-menu">

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