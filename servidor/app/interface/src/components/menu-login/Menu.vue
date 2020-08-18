<template>
  <div v-if="on" id="menu-login-buttons" class="menu-login-buttons">
    <div class="btn" v-for="(button, index) in buttons" v-bind:key="index" v-show="button.on">
      <button class="pointer" v-on:click="onclick(button.event)">{{ button.label }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name : "MenuLogin",
  props: {
    functions: {
      type     : Object,
      required : true
    }
  },
  mounted() {
    this.listiner();
  },
  data: () => ({
    on: false,
    buttons: [
      { label: 'About',   on: false, event: 'about'   },
      { label: 'Contact', on: false, event: 'contact' },
      { label: 'Sing-in', on: false, event: 'login'   }
    ],
    menu: null,
    options: null
  }),
  methods: {
    async listiner() {
      this.$parent.$on('menu-click', this.rendMenu);
      this.$parent.$on('close-all', this.close);
    },
    close() {
      this.on = false;
    },
    async rendMenu() {
      this.on = !this.on;
      if (!this.on) {
        this.buttons.forEach(async (btn, index) => {
          setTimeout(() => {
            btn.on = false;
          }, 50 * index);
        });
        return true;
      }

      await this.setOffSet();
      this.buttons.forEach(async (btn, index) => {
        setTimeout(() => {
          btn.on = true;
        }, 50 * index);
      });
    },
    async setOffSet() {
      this.menu    = await this.functions.getDivision('menu');
      this.options = await this.functions.getDivision('menu-login-buttons');

      let { offsetWidth, offsetHeight } = this.functions.getOffSet(this.menu);
      this.options.style.bottom = `${offsetHeight}px`;
    },
    async onclick(label) {
      this.rendMenu();
      if (label == 'login')
        this.functions.eventPromise({ eventName: 'cursor-loading', data: { on: true } });
      if (label) this.functions.eventPromise({ eventName: `show-${label}` });
      return true;
    }
  }
}
</script>

<style>
.menu-login-buttons {
  position: fixed;
  width: 180px;
  height: 165px;
  background-color: #2d2e7e;
}
.menu-login-buttons .btn {
  width: 95%;
  background-color: #050755;
  margin: 2px auto;
  position: static;
  width: 170px;
}
.menu-login-buttons .btn button {
  width: 98%;
  height: 50px;
  border: none;
  color: #ffffff;
  background-color: #9c88ff;
  box-shadow: 0px 0px 5px 0px #9c88ff;
  margin: 2px auto;
}
.menu-login-buttons .btn button:hover {
  background-color: #ab9cfa;
}
.menu-login-buttons .btn button:focus {
  border: 2px solid #ab9cfa;
  box-shadow: 0px 0px 5px 0px #ab9cfa;
  outline: 0;
}
</style>