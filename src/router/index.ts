import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainPage from '@/views/MainPage.vue'
import MarkerHistory from '@/views/MarkerHistory.vue'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage
  },
  {
    path: '/history',
    name: "MarkerHistory",
    component: MarkerHistory
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router