/**
 * 权限指令
 * 用法：v-permission="['admin']" 或 v-permission="'admin'"
 */

import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'

/**
 * 权限指令
 */
export const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding

    if (!value) {
      return
    }

    const userStore = useUserStore()
    const permissionStore = usePermissionStore()

    const permissions = Array.isArray(value) ? value : [value]
    const hasPermission = permissions.some((permission) =>
      permissionStore.hasPermission(permission, userStore.permissions)
    )

    if (!hasPermission) {
      el.parentNode?.removeChild(el)
    }
  },
}

/**
 * 角色指令
 * 用法：v-role="['admin']" 或 v-role="'admin'"
 */
export const role: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding

    if (!value) {
      return
    }

    const userStore = useUserStore()
    const permissionStore = usePermissionStore()

    const roles = Array.isArray(value) ? value : [value]
    const hasRole = roles.some((role) => permissionStore.hasRole(role, userStore.roles))

    if (!hasRole) {
      el.parentNode?.removeChild(el)
    }
  },
}
