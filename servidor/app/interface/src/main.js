import { createApp } from 'vue'
import App from './views/app/App.vue'
import router from './router'
import Component from './component'
import Functions from './function'

const app = createApp(App);

app.use(router);

Component(app);
Functions(app);

app.mount(App,'#app')
