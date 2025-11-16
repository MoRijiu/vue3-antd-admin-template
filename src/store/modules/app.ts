/**
 * 应用状态管理
 */

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { DEFAULT_THEME_COLOR, DEFAULT_THEME_MODE } from '@/config/theme'
import type { ThemeMode } from '@/config/theme'

export const useAppStore = defineStore(
  'app',
  () => {
    // ==================== State ====================
    // 侧边栏是否折叠
    const collapsed = ref(false)
    // 设备类型
    const device = ref<'desktop' | 'mobile'>('desktop')
    // 主题模式
    const theme = ref<ThemeMode>(DEFAULT_THEME_MODE)
    // 主题色
    const themeColor = ref(DEFAULT_THEME_COLOR)
    // 语言
    const locale = ref('zh-CN')
    // 页面加载状态
    const loading = ref(false)

    // ==================== Getters ====================
    // 是否为移动端
    const isMobile = () => device.value === 'mobile'
    // 是否为暗色主题
    const isDark = () => theme.value === 'dark'

    // ==================== Actions ====================
    /**
     * 切换侧边栏折叠状态
     */
    function toggleCollapsed() {
      collapsed.value = !collapsed.value
    }

    /**
     * 设置侧边栏折叠状态
     */
    function setCollapsed(value: boolean) {
      collapsed.value = value
    }

    /**
     * 设置设备类型
     */
    function setDevice(value: 'desktop' | 'mobile') {
      device.value = value
    }

    /**
     * 切换主题
     */
    function toggleTheme() {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    /**
     * 设置主题
     */
    function setTheme(value: ThemeMode) {
      theme.value = value
      applyTheme()
    }

    /**
     * 设置主题色
     */
    function setThemeColor(value: string) {
      themeColor.value = value
      applyThemeColor()
    }

    /**
     * 应用主题模式到 DOM
     */
    function applyTheme() {
      const html = document.documentElement
      if (theme.value === 'dark') {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }

    /**
     * 应用主题色到 DOM
     */
    function applyThemeColor() {
      document.documentElement.style.setProperty('--primary-color', themeColor.value)
    }

    /**
     * 初始化主题
     */
    function initTheme() {
      applyTheme()
      applyThemeColor()
    }

    /**
     * 设置语言
     */
    function setLocale(value: string) {
      locale.value = value
    }

    /**
     * 设置加载状态
     */
    function setLoading(value: boolean) {
      loading.value = value
    }

    /**
     * 重置状态
     */
    function reset() {
      collapsed.value = false
      device.value = 'desktop'
      theme.value = DEFAULT_THEME_MODE
      themeColor.value = DEFAULT_THEME_COLOR
      locale.value = 'zh-CN'
      loading.value = false
      initTheme()
    }

    // 监听主题变化，自动应用
    watch(theme, () => {
      applyTheme()
    })

    // 监听主题色变化，自动应用
    watch(themeColor, () => {
      applyThemeColor()
    })

    return {
      // State
      collapsed,
      device,
      theme,
      themeColor,
      locale,
      loading,
      // Getters
      isMobile,
      isDark,
      // Actions
      toggleCollapsed,
      setCollapsed,
      setDevice,
      toggleTheme,
      setTheme,
      setThemeColor,
      setLocale,
      setLoading,
      initTheme,
      reset,
    }
  },
  {
    // 持久化配置
    persist: {
      key: 'app-store',
      storage: localStorage,
      // 指定需要持久化的字段
      paths: ['collapsed', 'theme', 'themeColor', 'locale'],
    },
  }
)
