<template>
  <div>
    <h1>Get All Coffees</h1>

    <div v-if="authenStore.token">
      <p>ผู้ใช้งาน: {{ authenStore.user?.email }}</p>
      <button @click="logout">ออกจากระบบ (Logout)</button>
    </div>
    <div v-else>
      <button @click="navigateTo('/login')">เข้าสู่ระบบ (Login)</button>
    </div>

    <hr>
    
    <div v-if="authenStore.token">
      <button @click="navigateTo('/coffee/create')">สร้างกาแฟ +</button>
    </div>

    <div>จำนวนเมนู {{ coffees.length }}</div>

    <div v-if="coffees.length > 0">
      <div
        v-for="coffee in coffees"
        :key="coffee.id"
        style="margin-bottom: 15px;"
      >
        <div>id: {{ coffee.id }}</div>
        <div>ชื่อเมนู: {{ coffee.name }}</div>
        <div>ราคา: {{ coffee.price }}</div>
        <div>ประเภท: {{ coffee.type }}</div>

        <p>
          <button @click="navigateTo('/coffee/' + coffee.id)">
            ดูรายละเอียด
          </button>

          <span v-if="authenStore.token">
            <button @click="navigateTo('/coffee/edit/' + coffee.id)">
              แก้ไข
            </button>

            <button @click="deleteCoffee(coffee)">
              ลบเมนู
            </button>
          </span>
        </p>

        <hr />
      </div>
    </div>

    <div v-else>
      ยังไม่มีเมนูกาแฟ
    </div>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
import { useAuthenStore } from '../../stores/authen' // 1. นำเข้า Store

export default {
  // 2. ดึงค่าจาก Store มาใช้ใน Template
  setup() {
    const authenStore = useAuthenStore()
    return { authenStore }
  },
  data () {
    return {
      coffees: []
    }
  },
  async created () {
    this.refreshData()
  },
  methods: {
    // 3. สั่ง Logout และเคลียร์ค่า
    logout() {
      this.authenStore.logout()
      this.$router.push('/login')
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteCoffee (coffee) {
      let result = confirm('Want to delete?')
      if (result) {
        try {
          await CoffeesService.delete(coffee)
          this.refreshData()
        } catch (err) {
          console.log(err)
        }
      }
    },
    async refreshData () {
      this.coffees = (await CoffeesService.index()).data
    }
  }
}
</script>