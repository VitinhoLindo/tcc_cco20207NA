import Storage from './Storage'

class Application extends Storage {
  constructor() { super(); }

  addFormFunction(formName = '', attribute = '', func) {
    if (!this.formData[formName]) this.formData[formName] = {};
    this.formData[formName][attribute] = func;
  }

  clearFormFunction(formName = '', attribute = '') {
    if (!this.formData[formName]) return;
    if (this.formData[formName][attribute]) delete this.formData[formName][attribute];
  }

  getFormFunction(formName = '') {
    return this.formData[formName] || {};
  }

  getCollection(data) {
    return new this.Collection(data);
  }
}

export default Application;