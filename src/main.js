import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
const API_URL_PORT = "https://localhost:44388/"


export default {
    API_URL_PORT
}