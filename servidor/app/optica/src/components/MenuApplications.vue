<template>
  <div class="w5 h-full flex-right" v-if="on">
    <div class="internal-system-apps h-full flex-center">
      <div class="system-option" @click="click">
        <svg focusable="false" viewBox="0 0 24 24">
          <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageMixin from '../mixins/language'

export default {
  name: 'MenuApplications',
  mounted() {
    this.listen();
    this.getApps();
  },
  mixins: [LanguageMixin],
  data() {
    return {
      on: false,
      show: false,
      apps: []
    };
  },
  methods: {
    async listen() {
      this.$app.on('close-applications', this.click);
    },
    async getApps() {
      try {
        let res = await this.$app.request({
          url: '/app',
          method: 'get'
        });
  
        if (res.status == 'error') {
          throw res.message;
        }
  
        this.apps = res.result;
        this.on = true;
      } catch (error) {
        console.error(error);
      }
    },
    click(event) {
      this.show = !this.show;
      this.$app.emit('applications', { on: this.show, apps: this.apps });
    }
  }
}
</script>