import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../views/About.vue'
import Account from '../views/Account.vue'
import Dataset from '../views/Dataset.vue'
import Home from '../views/Home.vue'
import S3Upload from '../views/S3Upload.vue'
import Upload from '../views/Upload.vue'

import { authGuard } from "../auth/authGuard"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    beforeEnter: authGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: authGuard
  },
  {
    path: '/dataset',
    name: 'Dataset',
    component: Dataset,
    beforeEnter: authGuard
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
    beforeEnter: authGuard
  },
  {
    path: '/s3upload',
    name: 'S3Upload',
    component: S3Upload,
    beforeEnter: authGuard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router