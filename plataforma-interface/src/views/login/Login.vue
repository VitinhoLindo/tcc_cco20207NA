<template>
  <div id="login">
    <div class="login content">
      <div class="input">
        <div class="space">
          <span></span>
        </div>
        <div class="label">
          <label>{{ labels.user }}</label>
        </div>
        <div class="login-input">
          <input type="text" v-model="login">
          <span></span>
        </div>
        <div class="label">
          <label>{{ labels.pass }}</label>
        </div>
        <div class="login-input">
          <input type="password" v-model="key">
          <span></span>
        </div>
        <div class="remember">
          <div class="content">
            <input type="checkbox" v-model="remember">
            <label>{{ labels.remember }}</label>
          </div>
          <div class="forgotem">
            <a href="" v-on:click.prevent="onclick('forgotem')">{{ labels.forgotem }}</a>
          </div>
        </div>
        <div class="login-buttons">
          <button v-on:click="onclick('cancel')" v-bind:disabled="disabled">{{ labels.cancel }}</button>
          <button v-on:click="onclick('login')"  v-bind:disabled="disabled">{{ labels.singin }}</button>
        </div>
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
            {}
          );
          
          if (response.error) throw response.error;
          let auth = {
            token: response.result.token
          }
          this.$emit('listen', { name: 'login-success' });
          if (this.remember) auth.login = this.login;
          await this.functions.authentication(auth);
        } catch (error) { console.log(error); }
        this.disabled = false;
      },
      onclick(type) {
        if (type == 'cancel') {
          this.$emit('listen', { name: 'login-cancel' })
        } else if (type == 'login') {
          this.loginSync()
        } else if (type == 'forgotem') {
        }
        return true;
      }
    }
}
</script>

<style>
#login {
  margin-top: 5%;
  margin-left: 5%;
  width: 360px;
  height: 240px;
  border: 1px solid #ecf0f1;
}
.login.content {
  margin: 5%;
  width: 90%;
  height: 85%;
}
.login.content .input .space {
  width: 100%;
  height: 10px;
}
.login.content .input .label {
  font-size: 18px;
  color: #2f3640;
  padding: 5px 10px 0px 10px;
  margin-bottom: 5px;
}
.login.content .input {
  width: 100%;
  height: 50px;
}
.login.content .input .remember {
  display: flex;
  margin: 10px 0px;
}
.login.content .input .remember .content {
  display: flex;
}
.login.content .input .remember input {
  cursor: pointer;
  width: 17px;
  height: 17px;
  border: 1px #3498db;
}
.login.content .input .remember input:focus {
  box-shadow: 0 0 2px 0 #3498db;
  border: 1px solid #3498db;
  outline: 0;
}
.login.content .input .remember label {
  text-align: center;
  font-size: 17px;
  margin: 1px 0px 0px 5px;
}
.login.content .input .remember .forgotem {
  margin: 2px 0px;
}
.login.content .input .remember div {
  margin: 0px 5px;
  width: 50%;
}
.login-input {
  width: 100%;
}
.login-input input {
  width: 98%;
  font-size: 17px;
  border: 1px solid #ecf0f1;
  -webkit-border-radius: 5px;
  padding: 5px;
}
.login-input input:focus {
  box-shadow: 0px 0px 2px 1px #3498db;
  border: 1px solid #3498db;
  outline: 0;
}
.login-buttons {
  width: 100%;
  height: 35px;
  display: flex;
}
.login-buttons button {
  width: 100px;
  border: none;
  background-color: #ffffff;
  margin: 0px auto;
  cursor: pointer;
  font-size: 15px;
}
.login-buttons button:hover {
  background-color: #fafafa;
}
.login-buttons button:focus {
  color: #3498db;
  box-shadow: 0px 0px 5px 0px #3498db;
  border: 1px solid #3498db;
  outline: 0;
}
.login-buttons button:disabled {
  color: #aaaaaa;
}
</style>