import router, { getPermissionsRoutes, getPermissionsFirstRouterPath } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/403', '/404'] // no redirect whitelist

function jumpPermissionsRouter(to, from, next) {
  const { userInfo } = store.getters
  const userPrivilege = userInfo && userInfo.privilege || []
  const permissionsRouterList = getPermissionsRoutes(userPrivilege)
  const filterRoutes = [
    ...permissionsRouterList,
    { path: '*', redirect: '/404', hidden: true }
  ]
  if (permissionsRouterList.length <= 0 || userPrivilege.length <= 0) { // 没有权限
    next('/403')
  } else {
    if (store.getters.permissionsRoutes.length <= 0) { // 没有权限路由，添加权限路由
      store.dispatch('user/setPermissionsRoutes', permissionsRouterList)
      router.addRoutes(filterRoutes)
      next({ ...to, replace: true })
    } else {
      let toPath
      if (to.path === '/') { // 首页跳到有当前权限的第一个路由
        toPath = getPermissionsFirstRouterPath(permissionsRouterList)
      }
      toPath ? next(toPath) : next()
    }
  }
}

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (whiteList.includes(to.path)) {
    next()
  } else if (hasToken) {
    const { userInfo } = store.getters
    const hasGetUserInfo = userInfo && userInfo.user_name
    if (hasGetUserInfo) {
      jumpPermissionsRouter(to, from, next)
    } else {
      await store.dispatch('user/resetToken')
      Message.error('Has Error')
      next(`/login?redirect=${to.path}`)
    }
  } else {
    // other pages that do not have permission to access are redirected to the login page.
    next(`/login?redirect=${to.path}`)
  }
  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
