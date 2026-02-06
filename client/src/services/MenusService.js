import Api from './Api'

export default {
  index () {
    return Api().get('menus')
  },
  show (menuId) {
    return Api().get('menu/' + menuId)
  },
  post (menu) {
    return Api().post('menu', menu)
  },
  put (menu) {
    return Api().put('menu/' + menu.id, menu)
  },
  delete (menu) {
    return Api().delete('menu/' + menu.id)
  }
}