import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import LinksFound from '../views/LinksFound.vue'
import SearcherLinks from '../views/SearcherLinks.vue'

import GeneratePsi from '../views/GeneratePsi.vue'
import ReportDetailsPsi from '../views/ReportDetailsPsi.vue'
import ReportsPsi from '../views/ReportsPsi.vue'

import GenerateWave from '../views/GenerateWave.vue'
import ReportDetailsWave from '../views/ReportDetailsWave.vue'
import ReportsWave from '../views/ReportsWave.vue'
import WaveKey from '../views/WaveKey.vue'

import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import MyProfile from '../views/MyProfile.vue'

import ManageUsers from '../views/ManageUsers.vue'
import ReportsUsersPsi from '../views/ReportsUsersPsi.vue'
import ReportsUsersWave from '../views/ReportsUsersWave.vue'

import test from '../views/test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',name: 'home',component: HomeView },
    {path: '/linksFound',name: 'linksFound',component: LinksFound },
    {path: '/searcherLinks',name: 'sarcherLinks',component: SearcherLinks },
    {path: '/generatePsi',name: 'generatePsi',component: GeneratePsi },
    {path: '/reportDetailsPsi/:id',name: 'reportDetailsPsi',component: ReportDetailsPsi },
    {path: '/reportsPsi',name: 'reportsPsi',component: ReportsPsi },
    {path: '/generateWave',name: 'generateWave',component: GenerateWave },
    {path: '/reportDetailsWave/:id',name: 'reportDetailsWave',component: ReportDetailsWave },
    {path: '/reportsWave',name: 'reportsWave',component: ReportsWave },
    {path: '/waveKey',name: 'waveKey',component: WaveKey },
    {path: '/register',name: 'register',component: Register },
    {path: '/login',name: 'login',component: Login },
    {path: '/myProfile',name: 'myProfile',component: MyProfile },
    {path: '/manageUsers',name: 'manageUsers',component: ManageUsers },
    {path: '/reportsUsersPsi',name: 'reportsUsersPsi',component: ReportsUsersPsi },
    {path: '/reportsUsersWave',name: 'reportsUsersWave',component: ReportsUsersWave },
    {path: '/test',name: 'test',component: test },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
