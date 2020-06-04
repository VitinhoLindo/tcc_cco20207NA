<template>
  <div id="menu-login">
      <img class="options pointer" src="../../assets/cardapio.svg" v-on:click="onclick('option')">
      <div v-if="on" class="optbutton">
        <button class="ul-button h20 cl-white pointer" v-on:click="onclick('about')"  >{{  labels.about  }}</button>
        <button class="ul-button h20 cl-white pointer" v-on:click="onclick('contact')">{{ labels.contact }}</button>
        <div class="flex-opt flex no-padding w10-10 no-margin item-center">
          <button
            class="flex-button w10-10 pd-tp-bt-5px b-rl-10 margin-center cl-white font-20 bg-default-button"
            v-on:click="onclick('login')"
          >
            {{ labels.login }}
          </button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name : "MenuLogin",
    props: {
        auth: {
            type     : String,
            required : false
        },
        functions: {
            type     : Object,
            required : true
        }
    },
    mounted() {
        this.$parent.$on('close-all', this.close());
    },
    data: () => ({
        on: false,
        labels: {
            login: 'sing-in',
            about: 'about',
            contact: 'contact'
        }
    }),
    methods: {
        close() {
            this.on = false;
        },
        onclick(label) {
            switch (label) {
                case 'about':
                    this.$emit('menu-show', { name: 'about' });
                    break;
                case 'contact':
                    this.$emit('menu-show', { name: 'contact' });
                    break;
                case 'login':
                    this.$emit('menu-show', { name: 'login' });
                    break;
                case 'option':
                    this.on = !this.on;
                    return true;
            }

            this.on = !this.on;
            return true;
        }
    }
}
</script>

<style>
</style>