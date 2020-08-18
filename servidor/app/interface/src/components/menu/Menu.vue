<template>
  <div v-if="on" id="menu-buttons" class="menu-buttons">
    <div class="btn" v-for="(button, index) in buttons" v-bind:key="index" v-show="button.on">
      <button class="pointer" v-on:click="onclick(button.event, button.propertie)">{{ button.label }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuHome",
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
      {
        on: false,
        label: 'Cadastro Cliente',
        event: 'register-client',
        propertie: 'cadaster'
      },
      {
        on: false,
        label: 'Cadastro Funcionario',
        event: 'register-employer',
        propertie: ''
      },
      {
        on: false,
        label: 'Cadastro Produto',
        event: 'register-produt',
        propertie: ''
      },
      {
        on: false,
        label: 'Entrada Estoque',
        event: 'enter-stock',
        propertie: ''
      },
      {
        on: false,
        label: 'Entrada Estoque',
        event: 'enter-stock',
        propertie: ''
      },
      {
        on: false,
        label: 'Entrada Estoque',
        event: 'enter-stock',
        propertie: ''
      },
      {
        on: false,
        label: 'Entrada Estoque',
        event: 'enter-stock',
        propertie: ''
      }
    ]
  }),
  methods: {
    async listiner() {
      this.$parent.$on('menu-click', this.renderMenu);
      this.$parent.$on('close-all', this.close);
    },
    close() {
      this.on = false;
    },
    async renderMenu() {
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
      this.options = await this.functions.getDivision('menu-buttons');

      let { offsetWidth, offsetHeight } = this.functions.getOffSet(this.menu);
      this.options.style.bottom = `${offsetHeight}px`;
    },
    async onclick (event, propertie) {
      this.close();
      this.functions.eventPromise({ eventName: 'cursor-loading', data: { on: true } });
      this.functions.eventPromise({ eventName: 'menu-option',    data: { name: event, propertie: propertie } });
      return true;
    }
  }
}
</script>

<style>
.menu-buttons {
  position: fixed;
  width: 180px;
  height: 300px;
  background-color: #2d2e7e;
  overflow: auto;
}
.menu-buttons .btn {
  width: 95%;
  background-color: #050755;
  margin: 2px auto;
  position: static;
}
.menu-buttons .btn button {
  width: 98%;
  height: 50px;
  border: none;
  color: #ffffff;
  background-color: #9c88ff;
  box-shadow: 0px 0px 5px 0px #9c88ff;
  margin: 2px auto;
}
.menu-buttons .btn button:hover {
  background-color: #ab9cfa;
}
.menu-buttons .btn button:focus {
  border: 2px solid #ab9cfa;
  box-shadow: 0px 0px 5px 0px #ab9cfa;
  outline: 0;
}
</style>