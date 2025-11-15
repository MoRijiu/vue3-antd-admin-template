/**
 * 应用相关组合式函数
 */

import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'

export function useApp() {
  const appStore = useAppStore()

  // 应用状态
  const collapsed = computed(() => appStore.collapsed)
  const device = computed(() => appStore.device)
  const theme = computed(() => appStore.theme)
  const locale = computed(() => appStore.locale)
  const loading = computed(() => appStore.loading)
  const isMobile = computed(() => appStore.isMobile())
  const isDark = computed(() => appStore.isDark())

  /**
   * 切换侧边栏
   */
  function toggleSidebar() {
    appStore.toggleCollapsed()
  }

  /**
   * 设置侧边栏
   */
  function setSidebar(value: boolean) {
    appStore.setCollapsed(value)
  }

  /**
   * 切换主题
   */
  function toggleTheme() {
    appStore.toggleTheme()
  }

  /**
   * 设置主题
   */
  function setTheme(value: 'light' | 'dark') {
    appStore.setTheme(value)
  }

  /**
   * 设置语言
   */
  function setLocale(value: string) {
    appStore.setLocale(value)
  }

  /**
   * 设置加载状态
   */
  function setLoading(value: boolean) {
    appStore.setLoading(value)
  }

  return {
    // State
    collapsed,
    device,
    theme,
    locale,
    loading,
    isMobile,
    isDark,
    // Actions
    toggleSidebar,
    setSidebar,
    toggleTheme,
    setTheme,
    setLocale,
    setLoading,
  }
}
