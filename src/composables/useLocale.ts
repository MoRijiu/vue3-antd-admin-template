/**
 * 国际化组合式函数
 */

import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/store/modules/app'

export function useLocale() {
  const { locale, t } = useI18n()
  const appStore = useAppStore()

  /**
   * 切换语言
   */
  function changeLocale(lang: string) {
    locale.value = lang
    appStore.setLocale(lang)
    localStorage.setItem('locale', lang)
  }

  /**
   * 获取当前语言
   */
  function getCurrentLocale() {
    return locale.value
  }

  return {
    locale,
    t,
    changeLocale,
    getCurrentLocale,
  }
}
