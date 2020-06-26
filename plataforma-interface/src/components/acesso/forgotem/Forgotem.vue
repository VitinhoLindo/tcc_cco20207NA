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
      <!-- 
      <div class="label">
        <label>{{ labels.pass }}</label>
      </div>
      <div class="acesso-input">
        <input type="password" v-model="key">
      </div>
      <div class="error">
        <span class="content">{{ labels.error }}</span>
      </div> -->
      <!-- <div class="remember">
        <div class="content">
          <input type="checkbox" v-model="remember">
          <label>{{ labels.remember }}</label>
        </div>
        <div class="forgotem">
          <a href="#" v-on:click.prevent="(event) => onclick(event, 'forgotem')">{{ labels.forgotem }}</a>
        </div>
      </div> -->
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
      user  : 'E-mail',
      back  : 'Return',
      send  : 'Send'
    },
    disabled: false,
    login   : '',
    space   : 'initial',
    forgotemMessage: '',
    code    : ''
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

      this.forgotemMessage = response.message;
    },
    onclick(event, type) {
      if (type == 'back') {
        this.$emit('listen', { name: 'acesso-login' });
      } else if (type == 'send') {
        if (this.code) {
          
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