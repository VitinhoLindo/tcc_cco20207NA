<template>
  <div class="code">
    <div class="content">
      <div class="field">
        <div>{{ labels.code }}</div>
        <div>
          <input class="input-text" type="email" v-model="input.code.value">
        </div>
        <div class="error" v-if="input.code.error">{{ input.code.error }}</div>
      </div>

      <div class="field">
        <div class="message" v-if="labels.message">
          {{ labels.message }}
        </div>
      </div>
      <div v-if="shared && shared.forgotem">
        <div class="field btn-flex">
          <button v-on:click="validateCode('forgotem')" v-bind:disabled="labels.buttons.sendCodeOn">{{ labels.buttons.sendCode }}</button>
        </div>
      </div>
      <div v-else>
        <div class="field btn-flex">
          <button v-on:click="validateCode('login')" v-bind:disabled="labels.buttons.sendCodeOn">{{ labels.buttons.sendCode }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Code',
  props: {
    shared: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      labels: {
        code: 'Code',
        message: '',
        buttons: {
          sendCode: 'send',
          sendCodeOn: false
        }
      },
      input: {
        code: {
          value: '',
          error: ''
        }
      }
    }
  },
  methods: {
    async validateCode(type) {
      var res;
      if (type == 'forgotem') {
        res = await global.app.request({
          url: '/forgotem/code',
          method: 'post',
          body: {
            login: this.shared.login || '',
            code: this.input.code.value
          }
        });

        if (res.result.error) {
          if (res.result.error.login) {
            /** @param melhorar */
          } else if (res.result.error.code) {
            this.input.code.error = res.result.error.code;
          }
        } else {
          if (res.result.message) {
            this.labels.message = res.result.message;

            // 7325077
            this.shared.forgotemCode = true;
            this.shared.code = this.input.code.value;
            this.$emit('listen', { trigger: 'forgotem-code-validated', values: this.shared });
          }
        }
        return;
      }
      if (type == 'login') {
        return;
      }
      return;
    }
  }
}
</script>

<style lang="scss" scoped>
.code {
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>