<template>
  <div class="menu-app w95 h-full">
    <button class="app" v-for="(app, index) in apps" :key="index">
      <img :src="app.src" >
    </button>
  </div>
</template>

<script>
import AppsMixins from '../mixins/apps'

export default {
  name: 'ListApplications',
  mixins: [AppsMixins]
}
</script>