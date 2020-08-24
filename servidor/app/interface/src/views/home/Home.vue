<template>
  <div class="home">
    <img v-if="image.src" class="background" v-bind:style="image.style" v-bind:src="image.src">

    <app-login />

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
      image: {
        style: {},
        src: '',
      }
    }
  },
  methods: {
    render() {
      let { innerWidth, innerHeight } = global.app.offSetMain();
      this.image.style = {
        width: `${innerWidth}px`,
        height: `${innerHeight - 40}px`
      }
      try {
        this.image.src = global.config.home.image.src;
      } catch (error) {
        this.image.src = '';
      }
      global.app.push(this.homeResize);
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
  position: fixed;
  z-index: 1;
}
</style>