const LanguageMixin = {
  data() {
    return {
      language: {
        lang: '',
        labels: {}
      }
    };
  },
  mounted() {
    this.changeLanguage();
    this.$app.on('language-change', this.changeLanguage);
  },
  methods: {
    changeLanguage() {
      this.language = this.$app.$Language();
    }
  }
}

export default LanguageMixin;