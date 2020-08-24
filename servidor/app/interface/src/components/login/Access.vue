<template>
  <div class="access">
    <div class="content">
      <div class="field">
        <div>
          {{ labels.login }}
        </div>
        <div>
          <input class="input-text" type="email" v-model="input.login.value">
        </div>
        <div>
          {{ input.login.error }}
        </div>
      </div>
      <div class="field">
        <div>
          {{ labels.senha }}
        </div>
        <div>
          <input class="input-text" type="password" v-model="input.key.value">
        </div>
        <div>
          {{ input.key.error }}
        </div>
      </div>
      <div class="field">
        <div class="field flex">
          <div>
            <input type="checkbox" v-model="input.remember.value">
          </div>
          <div>
            {{ labels.remember }}
          </div>
        </div>
        <div>
          <a class="link" v-on:click="forgotem">{{ labels.forgotem }}</a>
        </div>
      </div>

      <div class="field btn-flex">
        <button v-on:click="singIn">{{ labels.button.login }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Access',
  mounted() {
    this.randle();
  },
  props: {
    shared: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      labels: {
        login: 'E-mail',
        senha: 'Password',
        remember: 'remember me',
        forgotem: 'Forgotem you password?',
        button: {
          login: 'sing-in'
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
        remember: {
          value: false,
          error: ''
        }
      }
    };
  },
  methods: {
    randle() {
      if (Object.keys(this.shared).length) {
        for (let key in this.shared) {
          this.input[key].value = this.shared[key];
        }
        return;
      }
      this.input.login.value = global.shared.login || '';
    },
    readValues() {
      let object = {};
      for (let key in this.input) {
        object[key] = this.input[key].value;
      }

      return object;
    },
    async forgotem() {
      this.$emit('listen', { trigger: 'forgotem-password', values: this.readValues() });
    },
    remember() {
      let shared = global.app.getStorage('shared', 'json');

      if (!shared) shared = {};
      shared.login = this.input.login.value;
      shared.remember = true;
      global.app.saveStorage('shared', JSON.stringify(shared));
    },
    async singIn() {
      var values = {};

      for (let key in this.input) {
        values[key] = this.input[key].value;
      }
      delete values.remember;

      let res = await global.app.request({
        url: '/login',
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
      }

      if (res.result.success) {
        if (this.input.remember.value) this.remember();
        this.$emit('listen', { trigger: 'sing-in', value: values });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.access {
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