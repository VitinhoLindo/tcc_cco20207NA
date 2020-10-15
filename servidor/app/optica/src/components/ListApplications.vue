<template>
  <div class="menu-app w95 h-full">
    <button class="app" v-for="(app, index) in apps" :key="index">
      <img :src="app.src" >
    </button>
  </div>
</template>

<script>
export default {
  name: 'ListApplications',
  mounted() {
    this.listen();
  },
  data() {
    return {
      apps: []
    };
  },
  methods: {
    async listen() {
      this.$app.on('open-app', (data) => this.controller('open', { app: data }));
    },
    controller(listen = '', opt) {
      switch (listen) {
        case 'open':
          this.apps.push(opt.app);
          break;
        default:
          break;
      }
    }
  }
}
</script>