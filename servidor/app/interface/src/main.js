import Vue from 'vue'
import App from './views/app/App';
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
