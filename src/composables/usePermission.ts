/**
 * 权限相关组合式函数
 */

import { computed } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'

export function usePermission() {
  const permissionStore = usePermissionStore()
  const userStore = useUserStore()

  // 权限状态
  const allRoutes = computed(() => permissionStore.allRoutes)
  const menuRoutes = computed(() => permissionStore.menuRoutes)
  const isRoutesGenerated = computed(() => permissionStore.isRoutesGenerated)

  /**
   * 检查是否有权限
   */
  function hasPermission(permission: string): boolean {
    return permissionStore.hasPermission(permission, userStore.permissions)
  }

  /**
   * 检查是否有角色
   */
  function hasRole(role: string): boolean {
    return permissionStore.hasRole(role, userStore.roles)
  }

  /**
   * 检查是否有任一权限
   */
  function hasAnyPermission(permissions: string[]): boolean {
    return permissions.some((permission) => hasPermission(permission))
  }

  /**
   * 检查是否有所有权限
   */
  function hasAllPermissions(permissions: string[]): boolean {
    return permissions.every((permission) => hasPermission(permission))
  }

  /**
   * 检查是否有任一角色
   */
  function hasAnyRole(roles: string[]): boolean {
    return roles.some((role) => hasRole(role))
  }

  /**
   * 检查是否有所有角色
   */
  function hasAllRoles(roles: string[]): boolean {
    return roles.every((role) => hasRole(role))
  }

  return {
    // State
    allRoutes,
    menuRoutes,
    isRoutesGenerated,
    // Actions
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
    hasAnyRole,
    hasAllRoles,
  }
}
