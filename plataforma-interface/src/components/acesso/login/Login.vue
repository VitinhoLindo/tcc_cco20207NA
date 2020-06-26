<template>
  <div id="login">
    <div class="input">
      <div class="space">
        <span></span>
      </div>
      <div class="label">
        <label>{{ labels.user }}</label>
      </div>
      <div class="acesso-input">
        <input type="text" v-model="login">
        <span></span>
      </div>
      <div class="label">
        <label>{{ labels.pass }}</label>
      </div>
      <div class="acesso-input">
        <input type="password" v-model="key">
      </div>
      <div class="error">
        <span class="content">{{ labels.error }}</span>
      </div>
      <div class="remember">
        <div class="content">
          <input type="checkbox" v-model="remember">
          <label>{{ labels.remember }}</label>
        </div>
        <div class="forgotem">
          <a href="#" v-on:click.prevent="(event) => onclick(event, 'forgotem')">{{ labels.forgotem }}</a>
        </div>
      </div>
      <div class="acesso-buttons">
        <button v-on:click="(event) => onclick(event, 'cancel')" v-bind:disabled="disabled">{{ labels.cancel }}</button>
        <button v-on:click="(event) => onclick(event, 'login')"  v-bind:disabled="disabled">{{ labels.singin }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'login',
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
    },
    data: () => ({
      labels: {
        login : 'Login',
        user  : 'E-mail',
        pass  : 'Password',
        forgotem: "Forgot your password?",
        remember: "remember me",
        singin: "sign in",
        cancel: 'cancel',
        error: ''
      },
      login: '',
      key: '',
      remember: false,
      disabled : false
    }),
    methods: {
      async loginSync() {
        this.disabled = true;
        try {
          let response = await this.functions.request(
            '/login',
            'post',
            {},
            { login: this.login, key: this.key },
          );
          
          if (response.error) {
            this.labels.error = response.message;
          } else {
            let auth = {
              token: response.token
            }
            this.$emit('listen', { name: 'acesso-success' });
            if (this.remember) auth.login = this.login;
            await this.functions.authentication(auth);
          }
        } catch (error) { console.error(error); }
        this.disabled = false;
      },
      onclick(event, type) {
        if (type == 'cancel') {
          this.$emit('listen', { name: 'acesso-cancel' })
        } else if (type == 'login') {
          this.loginSync()
        } else if (type == 'forgotem') {
          event.preventDefault();
          this.$emit('listen', { name: 'acesso-forgotem' })
        }
        return true;
      }
    }
}
</script>