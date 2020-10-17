export default {
  props: ['name'],
  async mounted() {
    this.getPanel();
  },
  data: function () {
    return {
    };
  },
  methods: {
    async getPanel() {
      let result = await this.$app.request({
        url: `/interface/${this.name}/`,
        method: 'get'
      })

      console.log(result);
    }
  }
}