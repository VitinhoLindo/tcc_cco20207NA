<template>
  <div id="acesso" v-bind:class="acessoId">
    <div class="acesso content">
      <app-login v-if="components.login.on" v-bind:functions="functions" v-bind:shared="shared" v-on:listen="controller" />
      <app-forgotem v-if="components.forgotem.on" v-bind:functions="functions" v-bind:shared="shared" v-on:listen="controller"/>
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
  data: () => ({
    components: {
      login: {
        on: true
      },
      forgotem: {
        on: false
      }
    },
    acessoId: 'acesso-div'
  }),
  methods: {
    showLogin() {
      this.components.forgotem.on = false;
      this.components.login.on    = true;
    },
    showForgotem() {
      this.components.forgotem.on = true;
      this.components.login.on    = false;
    },
    controller(option) {
      if (option.name == 'acesso-cancel') {
        this.$emit('listen', { name: 'acesso-cancel' });
      } else if (option.name == 'acesso-forgotem') {
        this.showForgotem();
        this.acessoId = 'forgotem-div';
      } else if (option.name == 'acesso-login') {
        this.showLogin();
        this.acessoId = 'acesso-div';
      } else if (option.name == 'acesso-success') {
        this.$emit('listen', { name: 'acesso-success' });
      }
    }
  }
}
</script>

<style>
.acesso-div {
  margin-top: 5%;
  margin-left: 5%;
  width: 360px;
  height: 250px;
  border: 1px solid #ecf0f1;
}
.forgotem-div {
  margin-top: 5%;
  margin-left: 5%;
  width: 360px;
  height: 140px;
  border: 1px solid #ecf0f1;
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
  height: 15px;
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