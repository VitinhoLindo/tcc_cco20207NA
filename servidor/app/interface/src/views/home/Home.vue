<template>
  <div class="home">
    <!-- <img v-if="image.src" class="background" v-bind:src="image.src">

    <app-login v-if="controller.login.on" />

    <cadastro-login v-if="controller.cadastroLogin.on" />

    <app-menu /> -->
  </div>
</template>

<script>
// import Menu from '../../components/menu/Menu';
// import Login from '../../components/login/Login';
// import CadastroLogin from '../../components/cadastro/login/Login';

export default {
  name: 'Home',
  components: {
    // AppMenu: Menu,
    // AppLogin: Login,
    // CadastroLogin
  },
  mounted() {
    // this.render();
    // global.listener.on('close-window', this.listener);
  },
  data() {
    return {
      image: { src: '' },
      controller: {
        login: { on: false },
        cadastroLogin: { on: false }
      }
    }
  },
  methods: {
    // async render() {
    //   global.listener.on('app-click', this.appClick);

    //   try {
    //     let res = await global.listener.request({
    //       url: '/config/person',
    //       method: 'post'
    //     });

    //     this.image.src = res.result.home.image.src;
    //   } catch (error) {
    //     this.image.src = '';
    //   }
    // },
    // appClick(data = { name: '', bool: false }) {
    //   switch(data.name) {
    //     case 'login':
    //       this.controller.login.on = data.bool;
    //       break;
    //     case 'cadastro-login':
    //       this.controller.cadastroLogin.on = data.bool;
    //       break;
    //   }
    // },
    // listener(data) {
    //   switch (data.name) {
    //     case 'cadastro-login':
    //       this.controller.cadastroLogin.on = data.bool;
    //       break;
    //     case 'login':
    //       this.controller.login.on = data.bool;
    //       break;
    //   }
    // },
    // homeResize(event, data) {
    //   this.image.style = {
    //     width: `${data.innerWidth}px`,
    //     height: `${data.innerHeight - 40}px`
    //   }
    // }
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