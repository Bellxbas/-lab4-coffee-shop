<template>
  <div>
    <h1>Create Menu</h1>
    <form @submit.prevent="createMenu">
      <p>Name: <input type="text" v-model="menu.name"></p>
      <p>Type: <input type="text" v-model="menu.type"></p>
      <p><button type="submit">สร้างเมนู</button></p>
    </form>
  </div>
</template>

<script>
import MenusService from '../../services/MenusService'

export default {
  data() {
    return {
      menu: { name: '', type: '' }
    }
  },
  methods: {
    async createMenu() {
      try {
        await MenusService.post(this.menu)
        this.$router.push('/menus')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>