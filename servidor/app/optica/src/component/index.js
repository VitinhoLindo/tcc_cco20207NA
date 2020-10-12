import Background from '../components/Background.vue'
import Menu from '../components/Menu.vue'
import Activities from '../components/Activities.vue'
import DateVue from '../components/Date.vue'
import Calendar from '../components/Calendar.vue'
import Option from '../components/Options'
import SelectField from '../components/Select.vue'
import ButtonField from '../components/Button.vue'
import MenuApplications from '../components/MenuApplications.vue'
import Applications from '../components/Applications.vue'
import ListApplications from '../components/ListApplications.vue'

export default function (Vue) {
  Vue.component('background', Background);
  Vue.component('menu-app', Menu);
  Vue.component('activities', Activities);
  Vue.component('date', DateVue);
  Vue.component('calendar', Calendar);
  Vue.component('app-option', Option);
  Vue.component('select-field', SelectField);
  Vue.component('button-field', ButtonField);
  Vue.component('menu-applications', MenuApplications);
  Vue.component('applications', Applications);
  Vue.component('list-applications', ListApplications);
}