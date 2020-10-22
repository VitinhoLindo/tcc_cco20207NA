export default {
  props: ['data', 'formName'],
  data() {
    return {
      value: '',
      error: ''
    };
  },
  watch: {
    value: function () {
      this.error = '';
    }
  },
  methods: {
    setError(value) {
      this.error = value;
    },
    get() {
      let data = {
        attribute: this.data.shared.attribute,
        value: this.value,
        error: this.setError
      };

      if (this.data.shared.using && this.data.shared.using.cache)
        data.cache = { time: this.data.shared.using.cache.time };

      return data;
    }
  },
  mounted() {
    this.$app.addFormFunction(this.formName, this.get);
  },
  unmounted() {
    this.$app.clearFormFunction(this.formName);
  }
}