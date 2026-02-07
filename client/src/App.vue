<template>
  <div id="app-wrapper">
    <back-header />

    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
  // ไม่ต้องมี components: { BackHeader } แล้ว เพราะลงทะเบียนที่ main.js แล้ว
}
</script>

<style>
/* ตั้งค่า CSS พื้นฐานให้เว็บดูสวยงาม */
body {
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f5f5; /* สีพื้นหลังเทาอ่อน */
}

/* กล่องเนื้อหาตรงกลาง */
.main-content {
  max-width: 1000px;      /* ความกว้างสูงสุด */
  margin: 20px auto;      /* จัดกึ่งกลางหน้าจอ */
  padding: 30px;
  background-color: white; /* พื้นหลังสีขาว */
  box-shadow: 0 2px 10px rgba(0,0,0,0.1); /* เงาฟุ้งๆ */
  border-radius: 10px;    /* มุมโค้งมน */
  min-height: 500px;      /* ความสูงขั้นต่ำ */
}
</style>