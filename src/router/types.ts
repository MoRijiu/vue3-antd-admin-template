/**
 * 路由类型定义
 */

import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由元信息
 */
export interface RouteMeta {
  // 页面标题
  title?: string
  // 图标
  icon?: string
  // 是否需要登录
  requiresAuth?: boolean
  // 是否在菜单中隐藏
  hideInMenu?: boolean
  // 是否缓存页面
  keepAlive?: boolean
  // 权限标识
  permissions?: string[]
  // 角色标识
  roles?: string[]
  // 排序
  order?: number
  // 外部链接
  externalLink?: string
  // 是否固定在标签页
  affix?: boolean
  // 面包屑
  breadcrumb?: boolean
  // 激活的菜单路径
  activeMenu?: string
}

/**
 * 扩展路由配置
 */
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta?: RouteMeta
  children?: AppRouteRecordRaw[]
}
