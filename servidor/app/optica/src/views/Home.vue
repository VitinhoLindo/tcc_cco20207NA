<template>
  <div class="home">
    <activities />

    <applications />

    <background :src="background.image.src || ''" />

    <component v-for="(app, index) in apps" :key="index" :is="'window-app'" :app="app" />

    <menu-app />
  </div>
</template>

<script>
import AppsMixins from '../mixins/apps'

export default {
  name: 'Home',
  mounted() {
    this.build();
  },
  mixins: [AppsMixins],
  data() {
    return {
      background: {
        image: {
          src: ''
        }
      }
    }
  },
  methods: {
    async build() {

      let res = await this.$app.request({
        url: '/config/person',
        method: 'post'
      });

      if (res.status == 'error') throw res.message;

      this.background = res.result.home;
    }
  }
}
</script>
