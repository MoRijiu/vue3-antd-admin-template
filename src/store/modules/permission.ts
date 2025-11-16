/**
 * 权限状态管理
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { routes } from '@/router/routes'

export const usePermissionStore = defineStore(
  'permission',
  () => {
    // ==================== State ====================
    // 所有路由
    const allRoutes = ref<RouteRecordRaw[]>([])
    // 动态路由
    const dynamicRoutes = ref<RouteRecordRaw[]>([])
    // 菜单路由
    const menuRoutes = ref<RouteRecordRaw[]>([])
    // 是否已生成路由
    const isRoutesGenerated = ref(false)

    // ==================== Getters ====================
    // 获取所有路由
    const getAllRoutes = () => allRoutes.value
    // 获取菜单路由
    const getMenuRoutes = () => menuRoutes.value

    // ==================== Actions ====================
    /**
     * 生成路由
     */
    function generateRoutes(_roles: string[] = []) {
      // 这里可以根据角色过滤路由
      // 简单示例：直接使用所有路由
      allRoutes.value = routes
      menuRoutes.value = filterMenuRoutes(routes)
      isRoutesGenerated.value = true
      return allRoutes.value
    }

    /**
     * 过滤菜单路由
     */
    function filterMenuRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
      return routes.filter((route) => {
        const meta = route.meta as any
        return !meta?.hideInMenu
      })
    }

    /**
     * 添加动态路由
     */
    function addDynamicRoute(route: RouteRecordRaw) {
      dynamicRoutes.value.push(route)
      allRoutes.value.push(route)
    }

    /**
     * 重置路由
     */
    function resetRoutes() {
      allRoutes.value = []
      dynamicRoutes.value = []
      menuRoutes.value = []
      isRoutesGenerated.value = false
    }

    /**
     * 检查权限
     */
    function hasPermission(permission: string, permissions: string[] = []): boolean {
      return permissions.includes(permission)
    }

    /**
     * 检查角色
     */
    function hasRole(role: string, roles: string[] = []): boolean {
      return roles.includes(role)
    }

    return {
      // State
      allRoutes,
      dynamicRoutes,
      menuRoutes,
      isRoutesGenerated,
      // Getters
      getAllRoutes,
      getMenuRoutes,
      // Actions
      generateRoutes,
      filterMenuRoutes,
      addDynamicRoute,
      resetRoutes,
      hasPermission,
      hasRole,
    }
  },
  {
    // 持久化配置
    persist: {
      key: 'permission-store',
      storage: sessionStorage,
      // 不持久化路由信息，每次刷新重新生成
      pick: ['isRoutesGenerated'],
    },
  }
)
