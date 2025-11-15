/*
 * @Author: morijiu
 * @Date: 2025-11-15 23:12:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-11-15 23:29:21
 * @Description:
 * @FilePath: \vue3-antd-admin-template\src\composables\useUser.ts
 */
/**
 * 用户相关组合式函数
 */

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import type { LoginParams } from '@/api/example'

export function useUser() {
  const router = useRouter()
  const userStore = useUserStore()

  // 用户信息
  const userInfo = computed(() => userStore.userInfo)
  const token = computed(() => userStore.token)
  const isLoggedIn = computed(() => userStore.isLoggedIn())
  const username = computed(() => userStore.username())
  const email = computed(() => userStore.email())

  /**
   * 登录
   */
  async function login(params: LoginParams) {
    try {
      await userStore.loginAction(params)
      message.success('登录成功')
      return true
    } catch {
      message.error('登录失败')
      return false
    }
  }

  /**
   * 登出
   */
  function logout() {
    userStore.logout()
    message.success('已退出登录')
    router.push('/login')
  }

  /**
   * 获取用户信息
   */
  async function getUserInfo() {
    try {
      await userStore.getUserInfo()
      return true
    } catch {
      message.error('获取用户信息失败')
      return false
    }
  }

  return {
    // State
    userInfo,
    token,
    isLoggedIn,
    username,
    email,
    // Actions
    login,
    logout,
    getUserInfo,
  }
}
