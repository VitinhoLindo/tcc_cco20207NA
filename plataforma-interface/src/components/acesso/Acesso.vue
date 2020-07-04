<template>
  <div id="acesso" 
       class="acesso-div" 
       v-if="on" 
       draggable="true" 
       v-on:dragend="(event) => dragend(event)" 
  >
    <div class="acesso content">
      <app-login 
        v-if="components.login.on" 
        v-bind:functions="functions" 
        v-bind:shared="shared" 
        v-on:listen="controller" 
      />

      <app-forgotem 
        v-if="components.forgotem.on" 
        v-bind:functions="functions" 
        v-bind:shared="shared" 
        v-bind:division="division" 
        v-on:listen="controller"
      />
    </div>
  </div>
</template>

<script>
import Login from './login/Login';
import Forgotem from './forgotem/Forgotem';

export default {
  name: 'Acesso',
  components: {
    AppLogin: Login,
    AppForgotem: Forgotem
  },
  async mounted() {
    this.renderPage();
    this.acessoListiner();
  },
  props: {
    functions: {
      type: Object,
      required: true
    },
    shared: {
      type: Object,
      required: true
    }
  },
  mounted() {ondrag
    this.$parent.$on('show-login', this.renderPage);
  },
  data: () => ({
    on: false,
    components: {
      login: {
        on: true
      },
      forgotem: {
        on: false
      },
    },
    interval: null,
    division: null
  }),
  methods: {
    setPosition(x, y) {
      this.division.style.top  = `${y}px`;
      this.division.style.left = `${x}px`;
    },
    dragend(event) {
      this.setPosition(event.clientX, event.clientY);
    },
    showLogin() {
      this.components.forgotem.on = false;
      this.components.login.on    = true;
    },
    showForgotem() {
      this.components.forgotem.on = true;
      this.components.login.on    = false;
    },
    async renderPage(option = 'login') {
      this.on = true;
      this.division = await this.functions.getDivision('acesso');

      this.setOffSet(250);
    },
    async setOffSet(height, width = 360) {
      this.division.style.width = `${width}px`;
      this.division.style.height = `${height}px`;
    },
    async controller(option) {
      if (option.name == 'acesso-cancel') {
        this.on = false;
      } else if (option.name == 'acesso-forgotem') {
        await this.setOffSet(140);
        this.showForgotem();
      } else if (option.name == 'acesso-login') {
        await this.setOffSet(250);
        this.showLogin();
      } else if (option.name == 'key-changed') {
        await this.setOffSet(250);
        this.showLogin();
      }
    }
  }
}
</script>

<style>
.acesso-div {
  position: fixed;
  top: 5%;
  left: 4%;
  width: 360px;
  border: 1px solid #ecf0f1;
  background-color: #ffffff;
}
.acesso.content {
  margin: 0% 5%;
  width: 90%;
  height: 85%;
}
.acesso.content .input .space {
  width: 100%;
  height: 10px;
}
.acesso.content .input .label {
  font-size: 18px;
  color: #2f3640;
  padding: 5px 10px 0px 10px;
  margin-bottom: 5px;
}
.acesso.content .input {
  width: 100%;
  height: 50px;
}
.acesso.content .input .remember {
  display: flex;
  margin: 10px 0px;
}
.acesso.content .input .remember .content {
  display: flex;
}
.acesso.content .input .remember input {
  cursor: pointer;
  width: 17px;
  height: 17px;
  border: 1px #3498db;
}
.acesso.content .input .remember input:focus {
  box-shadow: 0 0 2px 0 #3498db;
  border: 1px solid #3498db;
  outline: 0;
}
.acesso.content .input .remember label {
  text-align: center;
  font-size: 17px;
  margin: 1px 0px 0px 5px;
}
.acesso.content .input .remember .forgotem {
  margin: 2px 0px;
}
.acesso.content .input .remember div {
  margin: 0px 5px;
  width: 50%;
}
.acesso-input {
  width: 100%;
}
.acesso-input input {
  width: 98%;
  font-size: 17px;
  border: 1px solid #ecf0f1;
  -webkit-border-radius: 5px;
  padding: 5px;
}
.acesso-input input:focus {
  box-shadow: 0px 0px 2px 1px #3498db;
  border: 1px solid #3498db;
  outline: 0;
}
.acesso-buttons {
  width: 100%;
  height: 35px;
  display: flex;
}
.acesso-buttons button {
  width: 100px;
  border: none;
  background-color: #ffffff;
  margin: 0px auto;
  cursor: pointer;
  font-size: 15px;
}
.acesso-buttons button:hover {
  background-color: #fafafa;
}
.acesso-buttons button:focus {
  color: #3498db;
  box-shadow: 0px 0px 5px 0px #3498db;
  border: 1px solid #3498db;
  outline: 0;
}
.acesso-buttons button:disabled {
  color: #aaaaaa;
}
.error {
  height: 18px;
  width: 100%;
}
.error .content {
  font-size: 12px;
  color: red;
}
.message {
  font-size: 12px;
}
</style>