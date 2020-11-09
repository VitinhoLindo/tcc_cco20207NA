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
      return {
        attribute: this.data.shared.attribute,
        value: this.value,
        original: this.data,
        error: this.setError
      };
    }
  },
  mounted() {
    this.$app.addFormFunction(this.formName, this.data.shared.attribute, this.get);
  },
  unmounted() {
    this.$app.clearFormFunction(this.formName, this.data.shared.attribute);
  }
}