<template>
  <div>
    <h1>Get All Menus</h1>
    <div>จำนวนเมนู {{ menus.length }}</div>
    
    <div v-if="menus.length > 0">
      <div v-for="menu in menus" :key="menu.id">
        <div>id: {{ menu.id }}</div>
        <div>ชื่อ: {{ menu.name }}</div>
        <div>ประเภท: {{ menu.type }}</div>
        <p>
          <button @click="navigateTo('/menu/' + menu.id)">ดูรายละเอียด</button>
          <button @click="navigateTo('/menu/edit/' + menu.id)">แก้ไข</button>
          <button @click="deleteMenu(menu)">ลบ</button>
        </p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import MenusService from '../../services/MenusService'

export default {
  data() {
    return { menus: [] }
  },
  async created() {
    this.menus = (await MenusService.index()).data
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    async deleteMenu(menu) {
      if (confirm('ต้องการลบข้อมูล ' + menu.name + ' ใช่ไหม?')) {
        try {
          await MenusService.delete(menu)
          this.menus = (await MenusService.index()).data
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>