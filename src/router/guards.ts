/*
 * @Author: morijiu
 * @Date: 2025-11-15 19:36:23
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-11-15 19:39:14
 * @Description:
 * @FilePath: \vue3-antd-admin-template\src\router\guards.ts
 */
/**
 * 路由守卫配置
 */

import type { Router } from 'vue-router'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { getAppTitle } from '@/utils/env'
import { cancelAllPendingRequests } from '@/utils/cancel-request'

/**
 * 白名单路由（不需要登录）
 */
const WHITE_LIST = ['/login', '/404']

/**
 * 设置路由守卫
 */
export function setupRouterGuards(router: Router) {
  // 全局前置守卫
  router.beforeEach(async (to, _from, next) => {
    // 取消所有待处理的请求
    cancelAllPendingRequests()

    // 获取 Store
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()

    // 检查是否已登录
    const isLoggedIn = userStore.isLoggedIn()

    // 已登录
    if (isLoggedIn) {
      // 访问登录页，重定向到首页
      if (to.path === '/login') {
        next({ path: '/' })
        return
      }

      // 生成路由（如果还未生成）
      if (!permissionStore.isRoutesGenerated) {
        try {
          // 根据用户角色生成路由
          permissionStore.generateRoutes(userStore.roles)
          // 重新导航到目标路由，确保动态路由生效
          next({ ...to, replace: true })
          return
        } catch (error) {
          console.error('生成路由失败:', error)
          // 生成路由失败，清除登录状态
          userStore.logout()
          message.error('加载权限失败，请重新登录')
          next({ path: '/login', query: { redirect: to.fullPath } })
          return
        }
      }

      next()
    } else {
      // 未登录
      // 在白名单中，直接访问
      if (WHITE_LIST.includes(to.path)) {
        next()
      } else {
        // 不在白名单中，重定向到登录页
        message.warning('请先登录')
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        })
      }
    }
  })

  // 全局后置守卫
  router.afterEach((to) => {
    // 设置页面标题
    const title = to.meta.title as string
    document.title = title ? `${title} - ${getAppTitle()}` : getAppTitle()

    // 页面加载完成后的处理
    // 可以在这里关闭 loading 等
  })

  // 全局错误处理
  router.onError((error) => {
    console.error('路由错误:', error)
    message.error('页面加载失败，请刷新重试')
  })
}
