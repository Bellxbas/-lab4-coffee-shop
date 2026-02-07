<template>
    <div>
      <h1>Login (เข้าสู่ระบบ)</h1>
      <form @submit.prevent="login">
        <div>
          <label>Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <br />
        <button type="submit">Login</button>
        <button type="button" @click="$router.push('/register')">สมัครสมาชิก</button>
      </form>
  
      <div v-if="error" style="color:red; margin-top: 10px;">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script>
  import AuthenService from '../services/AuthenService'
  import { useAuthenStore } from '../stores/authen' // เรียกใช้ Store
  
  export default {
    // Setup Store
    setup() {
      const authenStore = useAuthenStore()
      return { authenStore }
    },
    data() {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      async login() {
        try {
          const response = await AuthenService.login({
            email: this.email,
            password: this.password
          })
  
          // 1. เก็บ Token และ User เข้า Store (สำคัญมาก!)
          this.authenStore.setToken(response.data.token)
          this.authenStore.setUser(response.data.user)
  
          // 2. เด้งไปหน้ารายการกาแฟ
          this.$router.push('/coffees')
  
        } catch (error) {
          console.log(error)
          this.error = error.response?.data?.error || 'Login failed'
        }
      }
    }
  }
  </script>