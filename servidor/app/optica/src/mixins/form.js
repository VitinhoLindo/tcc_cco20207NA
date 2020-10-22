export default {
  props: ['name', 'class'],
  async mounted() {
    this.getFields();
    if (this.class)
      this.className = `${this.className} ${this.class}`;
  },
  data: function () {
    return {
      fields: [],
      className: 'app-form'
    };
  },
  methods: {
    async getFields() {
      try {
        let response = await this.$app.request({
          url: `/interface/${this.name}/`,
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
    fieldEvent(field) {
      return (field.shared.event) ? true : false;
    },
    saveData(data) {
      if (data.cache) {
        this.$app.saveTemporariCache(data.attribute, data.value, data.cache.time);
      }
    },
    fieldData() {
      let object = {};
      for (let func of this.$app.getFormFunction(this.name)) {
        let data = func();
        this.saveData(data);
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
          url: action.path,
          method: action.method,
          data: data
        });

        if (response.status == 'error') {
          if (response.result.error) {
            let keys = Object.keys(response.result.error);

            for (let key of keys) this.fieldError(key, response.result.error[key]);
            return;
          }

          throw response.message;
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    click(event) {
      try {
        switch (event.shared.action.actionName) {
          case 'submit':
            return this.submit(event.shared.action, this.fieldData());
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}