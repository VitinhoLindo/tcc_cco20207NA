const LanguageMixin = {
  data() {
    return {
      language: {
        lang: '',
        labels: {}
      },
      languages: null,
      newLang: ''
    };
  },
  mounted() {
    this.changeLanguage();
    this.getLanguages();
    this.$app.on('language-change', this.changeLanguage);
  },
  methods: {
    changeLanguage() {
      this.language = this.$app.$Language();
      this.newLang = this.language.lang;

      if (this.initialDate) {
        this.initialDate();
      }
    },
    async getLanguages() {
      this.languages = await this.$app.$Languages();
    },
    getOriginalLang(value) {
      for (let key in this.language.labels) {
        if (value == this.language.labels[key]) {
          return key;
        }
      }

      return null;
    },
    getCurrentLang() {
      return this.language.labels[this.newLang];
    },
    getLanguageTranslate() {
      return (this.languages || []).map((language) => {
        return this.language.labels[language];
      });
    }
  }
}

export default LanguageMixin;