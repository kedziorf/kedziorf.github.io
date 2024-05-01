import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
