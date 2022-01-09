import Vue from 'vue'
import VueRouter from 'vue-router'

import Api from '../views/Api.vue'
import Account from '../views/Account.vue'
import Dataset from '../views/Dataset.vue'
import DatasetNew from '../views/DatasetNew.vue'
import Home from '../views/Home.vue'

import { authGuard } from "../auth/authGuard"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/api',
    name: 'Api',
    component: Api,
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
    path: '/dataset/new',
    name: 'DatasetNew',
    component: DatasetNew,
    beforeEnter: authGuard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router