import Vue from 'vue'
import VueRouter from 'vue-router'

import Api from '../views/Api.vue'

import Account from '../views/Account.vue'
import Analyses from '../views/Analyses.vue'
import AnalysisInfo from '../views/AnalysisInfo.vue'
import AnalysisSingleCell from '../views/AnalysisSingleCell.vue'
import Datasets from '../views/Datasets.vue'
import DatasetBasespace from '../views/DatasetBasespace.vue'
import DatasetFiles from '../views/DatasetFiles.vue'
import DatasetNew from '../views/DatasetNew.vue'
import Home from '../views/Home.vue'
import Results from '../views/Results.vue'
import ResultsView from '../views/ResultsView.vue'

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
    path: '/analyses',
    name: 'Analyses',
    component: Analyses,
    beforeEnter: authGuard
  },
  {
    path: '/analyses/:uuid',
    name: 'AnalysisInfo',
    component: AnalysisInfo,
    beforeEnter: authGuard
  },
  {
    path: '/analysis/singlecell',
    name: 'AnalysisSingleCell',
    component: AnalysisSingleCell,
    beforeEnter: authGuard
  },
  {
    path: '/datasets',
    name: 'Datasets',
    component: Datasets,
    beforeEnter: authGuard
  },
  {
    path: '/datasets/:uuid',
    name: 'DatasetFiles',
    component: DatasetFiles,
    beforeEnter: authGuard
  },
  {
    path: '/dataset/new',
    name: 'DatasetNew',
    component: DatasetNew,
    beforeEnter: authGuard
  },
  {
    path: '/dataset/basespace',
    name: 'DatasetBasespace',
    component: DatasetBasespace,
    beforeEnter: authGuard
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
    beforeEnter: authGuard
  },  
  {
    path: '/results/:uuid',
    name: 'ResultsView',
    component: ResultsView,
    beforeEnter: authGuard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router