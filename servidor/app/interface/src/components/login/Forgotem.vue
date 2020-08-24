<template>
  <div class="forgotem">
    <div class="content">
      <div class="field">
        <div>{{ labels.login }}</div>
        <div>
          <input class="input-text" type="email" v-model="input.login.value">
        </div>
        <div class="error" v-if="input.login.error">
          {{ input.login.error }}
        </div>
      </div>


      <div v-if="internal.controller.newkey.on">
        <div class="field">
          <div>{{ labels.key }}</div>
          <div>
            <input class="input-text" type="password" v-model="input.key.value">
          </div>
          <div class="error" v-if="input.key.error">
            {{ input.key.error }}
          </div>
        </div>
        <div class="field">
          <div>{{ labels.newKey }}</div>
          <div>
            <input class="input-text" type="password" v-model="input.newKey.value">
          </div>
          <div class="error" v-if="input.newKey.error">
            {{ input.newKey.error }}
          </div>
        </div>
      </div>

      <div class="field">
        <div class="message" v-if="labels.message">
          {{ labels.message }}
        </div>
      </div>
      <div v-if="internal.controller.newkey.on">
        <div class="field btn-flex">
          <button v-on:click="alter" v-bind:disabled="labels.buttons.sendAlterOn">{{ labels.buttons.alter }}</button>
        </div>
      </div>
      <div v-else>
        <div class="field btn-flex">
          <button v-on:click="sendCode" v-bind:disabled="labels.buttons.sendCodeOn">{{ labels.buttons.sendCode }}</button>
        </div>
        <div class="field">
          <a class="link" v-on:click="back">{{ labels.buttons.cancel }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forgotem',
  props: {
    shared: {
      type: Object,
      required: false
    }
  },
  mounted() {
    if (this.shared) {
      this.input.login.value = this.shared.login;
      if (this.shared.forgotemCode) {
        this.internal.controller.newkey.on = this.shared.forgotemCode;
      }
    }
  },
  data() {
    return {
      labels: {
        login: 'Login',
        key: 'key',
        newKey: 'confirm new key',
        message: '',
        buttons: {
          sendCode: 'send code',
          sendCodeOn: false,
          alter: 'alter',
          sendAlterOn: false,
          cancel: 'back'
        }
      },
      input: {
        login: {
          value: '',
          error: ''
        },
        key: {
          value: '',
          error: ''
        },
        newKey: {
          value: '',
          error: ''
        }
      },
      internal: {
        controller: {
          newkey: {
            on: false
          }
        }
      }
    }
  },
  methods: {
    back() {
      if (this.labels.buttons.sendCodeOn) return;
      if (this.input.login.value) {
        if (!this.shared) this.shared = {};
        this.shared.login = this.input.login.value;
      }
      this.$emit('listen', { trigger: 'forgotem-back', values: this.shared });
    },
    async sendCode() {
      this.labels.buttons.sendCodeOn = true;
      var res = await global.app.request({
        url: '/forgotem',
        method: 'post',
        body: { login: this.input.login.value }
      });

      if (res.result.error) {
        for (let key in res.result.error) {
          if (!this.input[key]) continue;
          this.input[key].error = res.result.error[key];
        }
        this.labels.buttons.sendCodeOn = false;
        return;
      } else {
        for (let key in this.input) {
          this.input[key].error = '';
        }
      }

      this.labels.message = res.result.message;
      this.labels.buttons.sendCodeOn = false;
      if (!this.shared) this.shared = {};
      this.shared.login = this.input.login.value;
      this.shared.forgotem = true
      this.$emit('listen', { trigger: 'forgotem-sended-code', values: this.shared });
    },
    async alter() {
      let values = {};

      for (let key in this.input) {
        values[key] = this.input[key].value;
        // 10189727Jv!
      }

      values.code = this.shared.code;

      let res = await global.app.request({
        url: '/forgotem/alter',
        method: 'post',
        body: values
      })

      if (res.result.error) {
        for (let key in this.input) {
          if (res.result.error[key]) {
            this.input[key].error = res.result.error[key];
          } else {
            this.input[key].error = '';
          }
        }
        return;
      }

      delete this.shared.code;
      delete this.shared.forgotem;
      delete this.shared.forgotemCode;
      this.$emit('listen', { trigger: 'key-change', values: this.shared });
    }
  }
}
</script>

<style lang="scss" scoped>
.forgotem {
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>