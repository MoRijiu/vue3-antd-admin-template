/**
 * 路由工具函数
 */

import type { RouteRecordRaw } from 'vue-router'
import type { RouteMeta } from './types'

/**
 * 过滤需要在菜单中显示的路由
 */
export function filterMenuRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.filter((route) => {
    const meta = route.meta as RouteMeta
    return !meta?.hideInMenu
  })
}

/**
 * 获取所有路由的扁平列表
 */
export function flattenRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []

  function flatten(routes: RouteRecordRaw[]) {
    routes.forEach((route) => {
      result.push(route)
      if (route.children) {
        flatten(route.children)
      }
    })
  }

  flatten(routes)
  return result
}

/**
 * 根据路径查找路由
 */
export function findRouteByPath(routes: RouteRecordRaw[], path: string): RouteRecordRaw | null {
  const flatRoutes = flattenRoutes(routes)
  return flatRoutes.find((route) => route.path === path) || null
}

/**
 * 生成面包屑
 */
export function generateBreadcrumb(routes: RouteRecordRaw[], path: string): RouteRecordRaw[] {
  const breadcrumb: RouteRecordRaw[] = []
  const flatRoutes = flattenRoutes(routes)

  let currentPath = path
  while (currentPath) {
    const route = flatRoutes.find((r) => r.path === currentPath)
    if (route) {
      breadcrumb.unshift(route)
      // 查找父路由
      const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
      currentPath = parentPath
    } else {
      break
    }
  }

  return breadcrumb
}
