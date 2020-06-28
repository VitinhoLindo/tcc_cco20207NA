<template>
  <div id="forgotem">
    <div class="input">
      <div class="space">
        <span></span>
      </div>
      <div class="label">
        <label>{{ labels.user }}</label>
      </div>
      <div class="acesso-input">
        <input type="text" v-model="login">
      </div>
      <span class="message">{{ forgotemMessage }}</span>
      <div class="space">
        <span></span>
      </div>
      <div v-if="components.code.on">
        <div class="label">
          <label>{{ labels.code }}</label>
        </div>
        <div class="acesso-input">
          <input v-model="code">
        </div>
        <div class="error">
          <span class="content">{{ labels.codeError }}</span>
        </div>
      </div>
      <div v-if="components.newKey.on">
        <div class="label">
          <label>{{ labels.newKey }}</label>
        </div>
        <div class="acesso-input">
          <input v-bind:type="typeKey" v-model="newKey">
        </div>
        <div class="label">
          <label>{{ labels.newKeyConfirm }}</label>
        </div>
        <div class="acesso-input">
          <input v-bind:type="typeKey" v-model="newKeyConfirm">
        </div>
        <div class="error">
          <span class="content">{{ labels.newKeyError }}</span>
        </div>
      </div>
      <div class="acesso-buttons">
        <button v-on:click="(event) => onclick(event, 'back')" v-bind:disabled="disabled">{{ labels.back }}</button>
        <button v-on:click="(event) => onclick(event, 'send')"  v-bind:disabled="disabled">{{ labels.send }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forgotem',
  props: {
    functions: {
      type: Object,
      required: true
    },
    shared: {
      type: Object,
      required: true
    },
    division: {
      type: HTMLDivElement,
      required: true
    }
  },
  mounted() {
    if (this.shared.login) {
      this.remember = true;
      this.login    = this.shared.login;
    }
    this.getForgotemText();
  },
  data: () => ({
    labels: {
      user           : 'E-mail',
      back           : 'Return',
      send           : 'Send',
      code           : 'Code',
      error          : '',
      codeError      : '',
      newKey         : 'Nova Senha',
      newKeyConfirm : 'Confirmar Nova Senha',
      newKeyError    : ''
    },
    components: {
      code: {
        on: false
      },
      newKey: {
        on: false
      }
    },
    disabled        : false,
    login           : '',
    code            : '',
    forgotemMessage : '',
    code            : '',
    newKey          : '',
    newKeyConfirm  : '',
    typeKey         : 'password' 
  }),
  methods: {
    async getForgotemText() {
      let response = await this.functions.request(
        '/forgotem/message',
        'post'
      );
      
      this.forgotemMessage = response.message;
    },
    async getCode() {
      let response = await this.functions.request(
        '/forgotem',
        'post',
        {},
        { login: this.login }
      );

      this.forgotemMessage       = response.message;
      await this.functions.sleep(2);
      if (response.awaitCode) {
        this.division.style.height = '205px';
        this.forgotemMessage       = '';
        this.components.code.on    = true;
      }
    },
    async sendCode() {
      let response = await this.functions.request(
        '/forgotem/code',
        'post',
        {},
        { login: this.login, code: this.code }
      );

      if (response.error) {
        this.labels.codeError = response.message;
        return true;
      }

      if (response.awaitNewKey) {
        this.components.code.on    = false;
        this.components.newKey.on  = true;
        this.division.style.height = '270px';
        return true;
      }
    },
    async sendNewKey() {
      if (this.newKey.length <= 5) {
        this.labels.newKeyError = 'nova senha deve ter mais de 5 caracteres';
        return true;
      }
      if (this.newKeyConfirm.length <= 5) {
        this.labels.newKeyError = 'confirmar nova senha deve ter mais de 5 caracteres';
        return true;
      }
      if (this.newKey != this.newKeyConfirm) {
        this.labels.newKeyError = 'verifique se as senhas conferem';
        return true;
      }
      this.labels.newKeyError = '';
      let response = await this.functions.request(
        '/forgotem/redefine',
        'post',
        {},
        { login: this.login, code: this.code, newKey: this.newKey, newKeyConfirm: this.newKeyConfirm }
      );

      if (response.error) {
        this.labels.newKeyError = response.message;
        return true;
      }

      this.$emit('listen', { name: 'key-changed' });
    },
    openToCode() {
      return this.components.code.on;
    },
    openToNewKey() {
      return this.components.newKey.on;
    },
    onclick(event, type) {
      if (type == 'back') {
        this.$emit('listen', { name: 'acesso-login' });
      } else if (type == 'send') {
        if (this.openToCode()) {
          this.sendCode();
        } else if (this.openToNewKey()) {
          this.sendNewKey();
        } else {
          this.getCode();
        }
      }
    }
  }
}
</script>

<style>
.initial {
    width: 100%;
    height: 50px;
}
</style>