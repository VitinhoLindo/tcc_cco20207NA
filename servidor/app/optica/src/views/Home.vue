<template>
  <div class="home">
    <activities />

    <applications />

    <background :src="background.image.src || ''" />

    <menu-app />
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    this.build();
  },
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
