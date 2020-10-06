import Background from '../components/Background.vue'
import Menu from '../components/Menu.vue'
import Activities from '../components/Activities.vue'
import DateVue from '../components/Date.vue'
import Calendar from '../components/Calendar.vue'

export default function (Vue) {
  Vue.component('background', Background);
  Vue.component('menu-app', Menu);
  Vue.component('activities', Activities);
  Vue.component('date', DateVue)
  Vue.component('calendar', Calendar)
}