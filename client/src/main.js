import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 1. นำเข้า Plugin
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate) // 2. เปิดใช้งาน Plugin จำค่า

app.use(pinia) // 3. ใช้งาน Pinia
app.use(router)
app.mount('#app')