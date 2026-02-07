import { createRouter, createWebHistory } from 'vue-router'

// 1. นำเข้า Store เพื่อใช้เช็ค Token
import { useAuthenStore } from '../stores/authen'

// 2. นำเข้าหน้า Login และ Register
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

// ===== Users =====
import UserIndex from '../components/Users/Index.vue'
import UserCreate from '../components/Users/CreateUser.vue'
import UserEdit from '../components/Users/EditUser.vue'
import UserShow from '../components/Users/ShowUser.vue'

// ===== Menus =====
import MenuIndex from '../components/Menus/Index.vue'
import MenuCreate from '../components/Menus/CreateMenu.vue'
import MenuEdit from '../components/Menus/EditMenu.vue'
import MenuShow from '../components/Menus/ShowMenu.vue'

// ===== Coffees =====
import CoffeeIndex from '../components/coffees/index.vue'
import CoffeeCreate from '../components/coffees/CreateCoffee.vue'
import CoffeeEdit from '../components/coffees/EditCoffee.vue'
import CoffeeShow from '../components/coffees/ShowCoffee.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 3. Route สำหรับ Login และ Register
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },

    // ---------- User Routes ----------
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/edit/:id',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/:id',
      name: 'user-show',
      component: UserShow
    },

    // ---------- Menu Routes ----------
    {
      path: '/menus',
      name: 'menus',
      component: MenuIndex
    },
    {
      path: '/menu/create',
      name: 'menu-create',
      component: MenuCreate
    },
    {
      path: '/menu/edit/:menuId',
      name: 'menu-edit',
      component: MenuEdit
    },
    {
      path: '/menu/:menuId',
      name: 'menu-show',
      component: MenuShow
    },

    // ---------- Coffee Routes (มีการป้องกัน) ----------
    {
      path: '/coffees',
      name: 'coffees',
      component: CoffeeIndex
    },
    {
      path: '/coffee/create',
      name: 'coffee-create',
      component: CoffeeCreate,
      // 4. ใส่กุญแจล็อค (ต้อง Login ถึงจะเข้าได้)
      meta: { requiresAuth: true }
    },
    {
      path: '/coffee/edit/:coffeeId',
      name: 'coffee-edit',
      component: CoffeeEdit,
      // 4. ใส่กุญแจล็อค
      meta: { requiresAuth: true }
    },
    {
      path: '/coffee/:coffeeId',
      name: 'coffee-show',
      component: CoffeeShow
    }
  ]
})

// 5. ระบบยามเฝ้าประตู (Navigation Guard)
router.beforeEach((to, from, next) => {
  const authenStore = useAuthenStore() // เรียกใช้ Store

  // ถ้า Route ที่จะไป ต้องการ Auth (requiresAuth) และ ไม่มี Token
  if (to.meta.requiresAuth && !authenStore.token) {
    next({ name: 'login' }) // ดีดไปหน้า Login
  } else {
    next() // อนุญาตให้ผ่านไปได้
  }
})

export default router