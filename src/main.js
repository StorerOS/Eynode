/*
 * @Author: yaohongbin
 * @Date: 2021-11-23 13:55:36
 * @LastEditors: yaohongbin
 * @LastEditTime: 2022-06-25 18:13:21
 * @FilePath: \node-gateway-user-frontend\src\main.js
 */
// import 'core-js/es6/symbol'

import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as filters from './filters' // global filters

import * as directives from './directives' // global directives

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

locale.use(lang)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
