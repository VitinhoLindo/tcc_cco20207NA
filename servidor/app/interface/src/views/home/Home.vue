<template>
  <div class="home">
    <img v-if="image.src" class="background" v-bind:src="image.src">

    <app-login v-if="controller.login.on" />

    <app-menu />
  </div>
</template>

<script>
import Menu from '../../components/menu/Menu';
import Login from '../../components/login/Login';

export default {
  name: 'Home',
  components: {
    AppMenu: Menu,
    AppLogin: Login
  },
  mounted() {
    this.render();
  },
  data() {
    return {
      image: { src: '' },
      controller: {
        login: {
          on: false
        }
      }
    }
  },
  methods: {
    async render() {
      try {
        let res = await global.app.request({
          url: '/config/person',
          method: 'post'
        });

        this.image.src = res.result.home.image.src;
      } catch (error) {
        this.image.src = '';
      }
    },
    homeResize(event, data) {
      this.image.style = {
        width: `${data.innerWidth}px`,
        height: `${data.innerHeight - 40}px`
      }
    }
  }
}
</script>

<style lang="scss">
.background {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
}
</style>