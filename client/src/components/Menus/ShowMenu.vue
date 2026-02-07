<template>
  <div>
    <h1>Show Menu</h1>
    <p>ID: {{ menu.id }}</p>
    <p>Name: {{ menu.name }}</p>
    <p>Type: {{ menu.type }}</p>
    <p><button @click="$router.push('/menus')">กลับ</button></p>
  </div>
</template>

<script>
import MenusService from '../../services/MenusService'

export default {
  data() {
    return { menu: {} }
  },
  async created() {
    try {
      let menuId = this.$route.params.menuId
      this.menu = (await MenusService.show(menuId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>