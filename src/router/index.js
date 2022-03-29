import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView'

const routes = [
  {
    path: '/issues',
    name: 'issues',
    component: MainView,
    props: true
  },
  {
    path: '/',
    name: 'home',
    redirect: 'issues'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
