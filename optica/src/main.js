import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import functions from './function'
import component from './component'

(async () => {
  const app = createApp(App);

  // app.use(store)
  app.use(router);

  await functions(app);
  component(app);

  app.mount('#app');
})();