import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // จำค่า Login แม้รีเฟรช

import App from './App.vue'
import router from './router'
import './style.css'

// 1. นำเข้า Header Component ที่เราสร้างไว้
import BackHeader from './components/BackHeader.vue'

const app = createApp(App)
const pinia = createPinia()

// ใช้ Plugin ช่วยจำค่า Login
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

// 2. ลงทะเบียน Component แบบ Global (ตั้งชื่อว่า 'back-header')
// ทำให้เราใช้ <back-header /> ได้ในทุกไฟล์โดยไม่ต้อง import อีก
app.component('back-header', BackHeader)

app.mount('#app')