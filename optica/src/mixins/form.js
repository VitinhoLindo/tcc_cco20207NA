export default {
  props: ['name', 'class'],
  async mounted() {
    this.fieldName = this.name;
    this.getFields();
    if (this.class)
      this.className = `${this.className} ${this.class}`;
  },
  data: function () {
    return {
      fields: [],
      className: 'app-form',
      fieldName: ''
    };
  },
  methods: {
    async getFields() {
      try {
        let response = await this.$app.request({
          url: `/interface/${this.fieldName}/`,
          method: 'get'
        })

        if (response.status == 'error') {
          throw response.message;
        }

        this.fields = response.result;
      } catch (error) {
        console.error(error);
      }
    },
    async sendData() {

    },
    fieldEvent(field) {
      return (field.shared.event) ? true : false;
    },
    async use(original, value) {

      let { shared } = original;
      console.log(shared);

      if (shared.protect || false) {
        switch (shared.protect) {
          case 'hash':
            value = this.$app.hash(value);
            break;
          case 'encrypt':
            value = await this.$app.encrypt(value);
            break;
        }
      }

      if (shared.using || false) {
        if (shared.using.chache) {
          if (shared.using.chache.time) {
            this.$app.save(data.shared.attribute, value, shared.using.chache.time);
          } else {
            this.$app.save(data.shared.attribute, value);
          }
        }
      }

      return value;
    },
    async fieldData() {
      let object = {};
      let attributes = this.$app.getFormFunction(this.name);

      for (let attributeName in attributes) {
        let data = attributes[attributeName]();

        data.value = await this.use(data.original, data.value);
        object[data.attribute] = data.value;
      }

      return object;
    },
    fieldError(attribute, error) {
      for (let func of this.$app.getFormFunction(this.name)) {
        let data = func();
        if (data.attribute == attribute) data.error(error);
      }
    },
    async submit(action, data) {
      try {
        let response = await this.$app.request({
          url: `/interface/${action.fieldName || this.fieldName}/`,
          method: 'POST',
          data: data || {}
        });

        if (response.status == 'error') {
          if (!response.result.error)
            throw response.message;

          let keys = Object.keys(response.result.error);

          for (let key of keys) this.fieldError(key, response.result.error[key]);

          return;
        }

        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async changeField(action, data) {
      this.fieldName = action.fieldName;
      this.getFields();
    },
    async click(event) {
      try {
        switch (event.shared.action.actionName) {
          case 'submit':
            return this.submit(event.shared.action, await this.fieldData());
          case 'field':
            return this.changeField(event.shared.action, await this.fieldData());
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}