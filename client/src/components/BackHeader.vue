<template>
    <div class="header">
      <div class="logo">
        ☕ Coffee Shop
      </div>
      
      <div class="menu">
        <router-link to="/coffees" class="menu-link">รายการกาแฟ</router-link>
  
        <template v-if="authenStore.token">
          <router-link to="/users" class="menu-link">จัดการ Users</router-link>
          <a @click="logout" class="menu-link logout-btn">Logout</a>
          <span class="user-info"> | สวัสดี: {{ authenStore.user?.email }}</span>
        </template>
  
        <template v-else>
          <router-link to="/login" class="menu-link">เข้าสู่ระบบ</router-link>
          <router-link to="/register" class="menu-link">สมัครสมาชิก</router-link>
        </template>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthenStore } from '../stores/authen'
  
  export default {
    setup() {
      const authenStore = useAuthenStore()
      return { authenStore }
    },
    methods: {
      logout() {
        this.authenStore.logout() // เคลียร์ Token
        this.authenStore.$reset() // รีเซ็ตค่าทั้งหมด
        this.$router.push('/login') // ดีดกลับไปหน้า Login
      }
    }
  }
  </script>
  
  <style scoped>
  .header {
    background-color: #333;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #f1c40f;
  }
  
  .menu-link {
    color: white;
    text-decoration: none;
    margin-left: 15px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .menu-link:hover {
    color: #f1c40f;
    text-decoration: underline;
  }
  
  .router-link-active {
    color: #f1c40f; /* สีเหลืองเมื่ออยู่ที่หน้านั้น */
    font-weight: bold;
  }
  
  .logout-btn {
    color: #ff6b6b;
  }
  
  .user-info {
    color: #aaa;
    font-size: 14px;
    margin-left: 10px;
  }
  </style>