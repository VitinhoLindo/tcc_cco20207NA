import Axios from 'axios'

import Application from './Application'

class App extends Application {

  constructor(Vue) {
    super();
    this.vue = Vue;
  }

  /**
   * se for necessario adicionar alguma rotina para se utilizada adicionar aqui
   *
   * 1° verifica RSA
   */
  async listen() {
    setInterval(() => {
      this.sync();
    }, this.getMillisecondsUsingMinute(this.validateRSATimeMinutes));
  }

  async build() {
    this.readStorage();
    this.sync();
    await this.setlanguage(navigator.language);
    this.listen();
  }
}

export default async function (Vue) {
  Vue.config.globalProperties.$app = new App(Vue);
  await Vue.config.globalProperties.$app.build();
}