/**
 * Vue Router 配置
 */

import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { setupRouterGuards } from './guards'
import { routes } from './routes'

/**
 * 创建路由实例
 *
 * 注意：GitHub Pages 部署时建议使用 hash 模式
 * - createWebHashHistory: hash 模式，URL 带 #，适合静态部署
 * - createWebHistory: history 模式，URL 干净，需要服务器配置
 */
const router = createRouter({
  // 生产环境使用 hash 模式，开发环境使用 history 模式
  history: import.meta.env.PROD
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 滚动行为
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 设置路由守卫
setupRouterGuards(router)

export default router
