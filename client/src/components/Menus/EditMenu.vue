<template>
  <div>
    <h1>Edit Menu</h1>
    <form @submit.prevent="editMenu">
      <p>Name: <input type="text" v-model="menu.name"></p>
      <p>Type: <input type="text" v-model="menu.type"></p>
      <p><button type="submit">บันทึกแก้ไข</button></p>
    </form>
  </div>
</template>

<script>
import MenusService from '../../services/MenusService'

export default {
  data() {
    return { menu: { name: '', type: '' } }
  },
  async created() {
    try {
      let menuId = this.$route.params.menuId
      this.menu = (await MenusService.show(menuId)).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async editMenu() {
      try {
        await MenusService.put(this.menu)
        this.$router.push('/menus')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>