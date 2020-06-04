<template>
  <div id="menu">
      <menu-home 
        v-if="auth"
        v-bind:functions="functions" 
        v-on:menu-show="emit"
      />
      <menu-login 
        v-else 
        v-bind:functions="functions"
        v-on:menu-show="emit"
      />
  </div>
</template>

<script>
import MenuHome from '../../components/menu/Menu';
import MenuLogin from '../../components/menu-login/Menu';

export default {
    name: 'Menu',
    components: {
        MenuHome : MenuHome,
        MenuLogin: MenuLogin
    },
    props: {
        auth: {
            type: String,
            required: false
        },
        functions: {
            type: Object,
            required: true
        }
    },
    methods: {
        emit(option) {
            this.$emit('listen', option);
        }
    }
}
</script>

<style>
#menu {
    width: 100%;
    background-color: #8c7ae6;
    height: 40px;
}
</style>