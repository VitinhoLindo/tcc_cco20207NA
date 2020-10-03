import Background from '../components/Background.vue'
import Menu from '../components/Menu.vue'
import Activities from '../components/Activities.vue'

export default function (Vue) {
  Vue.component('background', Background);
  Vue.component('menu-app', Menu);
  Vue.component('activities', Activities);
}