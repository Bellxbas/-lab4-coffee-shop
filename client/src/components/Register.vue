<template>
    <div>
      <h1>Register (สมัครสมาชิก)</h1>
      <form @submit.prevent="register">
        <div>
          <label>Email:</label>
          <input type="email" v-model="email" required placeholder="กรอกอีเมล" />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required placeholder="กรอกรหัสผ่าน" />
        </div>
        <br />
        <button type="submit">ยืนยันการสมัคร</button>
        <button type="button" @click="$router.push('/login')">กลับไปหน้า Login</button>
      </form>
      
      <div v-if="error" style="color:red; margin-top: 10px;">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script>
  import AuthenService from '../services/AuthenService' // ใช้ ../ ตามที่แก้เมื่อกี้
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      async register() {
        try {
          await AuthenService.register({
            email: this.email,
            password: this.password
          })
          
          // สมัครเสร็จ ให้เด้งไปหน้า Login ทันที
          alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ')
          this.$router.push('/login')
          
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  }
  </script>