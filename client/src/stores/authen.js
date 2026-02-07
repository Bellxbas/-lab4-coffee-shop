import { defineStore } from 'pinia'

export const useAuthenStore = defineStore('authen', {
  state: () => ({
    token: '',
    user: null
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setUser(user) {
      this.user = user
    },
    logout() {
      this.token = ''
      this.user = null
    }
  },
  persist: true // จำค่าแม้จะ Refresh หน้า
})