/**
 * Store 工具函数
 */

import { useUserStore } from './modules/user'
import { useAppStore } from './modules/app'
import { usePermissionStore } from './modules/permission'

/**
 * 重置所有 Store
 */
export function resetAllStores() {
  const userStore = useUserStore()
  const appStore = useAppStore()
  const permissionStore = usePermissionStore()

  userStore.reset()
  appStore.reset()
  permissionStore.resetRoutes()
}

/**
 * 清除所有持久化数据
 */
export function clearAllPersist() {
  localStorage.removeItem('user-store')
  localStorage.removeItem('app-store')
  sessionStorage.removeItem('permission-store')
}
