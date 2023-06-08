import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "bootstrap/dist/css/bootstrap.min.css";
// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'
// import "bootstrap";

import App from './App.vue'
import router from './router'

// import '@/styles/bootstrap-5.3.0/scss/bootstrap.scss'
import '@/assets/custom.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.component('VueDatePicker', VueDatePicker);

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"
