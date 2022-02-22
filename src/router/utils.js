import _ from 'lodash'
import path from 'path'
import { permissionsRoutes } from './index'

// 获取有权限的路由
export const getPermissionsRoutes = (() => {
  const filterPermissionsRouter = (routes, permissionsMapList = []) => {
    if (!routes || routes.length <= 0) return []
    const list = []
    routes.forEach(route => {
      const { permissions } = route.meta
      const isStringIncludes = _.isString(permissions) && permissionsMapList.includes(permissions)
      const isArrayIncludes = _.isArray(permissions) && permissionsMapList.some(p => permissions.includes(p))
      if (!permissions || (!isStringIncludes && !isArrayIncludes && permissions !== true)) return
      if (route.children) {
        const assemblingRoute = {
          ...route
        }
        const routerChildrens = filterPermissionsRouter(route.children, permissionsMapList)
        if (routerChildrens.length > 0) {
          assemblingRoute.children = routerChildrens
          list.push(assemblingRoute)
        }
      } else {
        list.push(route)
      }
    })
    return list
  }
  return function filterRoutes(permissionsMapList) {
    if (!permissionsMapList || permissionsMapList.length <= 0) return []
    return filterPermissionsRouter(permissionsRoutes, permissionsMapList)
  }
})()

// 获取有权限路由的第一个路径
export function getPermissionsFirstRouterPath(permissionsRoutes) {
  const assemblingPath = (routes, searchPath) => {
    const paths = []
    const fillPath = (routes, searchPath) => {
      return routes.some(route => {
        const replacePath = route.path.replace(/\//, '')
        if (route.children) {
          const flag = fillPath(route.children, searchPath)
          if (flag) {
            paths.push(route.path)
            return true
          }
        } else {
          if (replacePath === searchPath) {
            paths.push(route.path)
            return true
          }
        }
      })
    }
    fillPath(routes, searchPath)
    return path.resolve(..._.reverse(paths))
  }
  const getFirstChild = (routes) => {
    let firstChild
    const child = (routes) => {
      return routes.some(r => {
        if (r.children && r.children.length > 0) {
          return child(r.children)
        } else {
          if (!r.hidden) {
            firstChild = r
            return true
          }
        }
        return false
      })
    }
    child(routes)
    return firstChild
  }

  const firstChild = permissionsRoutes && getFirstChild(permissionsRoutes)
  return firstChild ? assemblingPath(permissionsRoutes, firstChild.path) : ''
}
