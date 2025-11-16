/**
 * 用户状态管理
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getToken, setToken as saveToken, removeToken } from '@/config/request'
import { login, getCurrentUser } from '@/api/example'
import type { LoginParams, User } from '@/api/example'

export const useUserStore = defineStore(
  'user',
  () => {
    // ==================== State ====================
    // Token
    const token = ref<string>(getToken() || '')
    // 用户信息
    const userInfo = ref<User | null>(null)
    // 用户角色
    const roles = ref<string[]>([])
    // 用户权限
    const permissions = ref<string[]>([])

    // ==================== Getters ====================
    // 是否已登录
    const isLoggedIn = () => !!token.value
    // 用户名
    const username = () => userInfo.value?.name || ''
    // 用户邮箱
    const email = () => userInfo.value?.email || ''

    // ==================== Actions ====================
    /**
     * 登录
     */
    async function loginAction(params: LoginParams) {
      try {
        const res = await login(params)
        // 保存 token
        token.value = res.data.token
        saveToken(res.data.token)

        // 保存用户信息
        userInfo.value = res.data.userInfo

        // 保存角色和权限（如果返回数据中包含）
        if (res.data.userInfo.roles) {
          roles.value = res.data.userInfo.roles
        }
        if (res.data.userInfo.permissions) {
          permissions.value = res.data.userInfo.permissions
        }

        return res
      } catch (error) {
        throw error
      }
    }

    /**
     * 获取用户信息
     */
    async function getUserInfo() {
      try {
        const res = await getCurrentUser()
        userInfo.value = res.data
        return res
      } catch (error) {
        throw error
      }
    }

    /**
     * 登出
     */
    function logout() {
      token.value = ''
      userInfo.value = null
      roles.value = []
      permissions.value = []
      removeToken()
    }

    /**
     * 设置用户信息
     */
    function setUserInfo(info: User) {
      userInfo.value = info
    }

    /**
     * 设置角色
     */
    function setRoles(roleList: string[]) {
      roles.value = roleList
    }

    /**
     * 设置权限
     */
    function setPermissions(permissionList: string[]) {
      permissions.value = permissionList
    }

    /**
     * 重置状态
     */
    function reset() {
      token.value = ''
      userInfo.value = null
      roles.value = []
      permissions.value = []
    }

    return {
      // State
      token,
      userInfo,
      roles,
      permissions,
      // Getters
      isLoggedIn,
      username,
      email,
      // Actions
      loginAction,
      getUserInfo,
      logout,
      setUserInfo,
      setRoles,
      setPermissions,
      reset,
    }
  },
  {
    // 持久化配置
    persist: {
      key: 'user-store',
      storage: localStorage,
      // 指定需要持久化的字段
      pick: ['token', 'userInfo', 'roles', 'permissions'],
    },
  }
)
