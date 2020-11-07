/**
 * @param app
 * 
 * data: ["_id", "name", "appName", "src", "content", "auth"]
 */

export default {
  mounted() {
    this.listen();
  },
  data() {
    return {
      apps: []
    };
  },
  methods: {
    async listen() {
      this.$app.on('open-app', (data) => this.controller('open', { app: data }));
      this.$app.on('close-app', (data) => this.controller('close', { app: data }));
    },
    controller(listen = '', opt) {
      switch (listen) {
        case 'open':
          let apps = this.$app.applications.getCollection(this.apps);

          if (!apps.where('_id', opt.app._id).count()) {
            this.apps.push(opt.app);
          }
          break;
        case 'close': 
          break;
      }
    }
  }
}