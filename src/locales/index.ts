/*
 * @Author: morijiu
 * @Date: 2025-11-15 20:06:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-11-15 20:07:50
 * @Description:
 * @FilePath: \vue3-antd-admin-template\src\locales\index.ts
 */
/**
 * i18n 国际化配置
 */

import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: localStorage.getItem('locale') || 'zh-CN', // 默认语言
  fallbackLocale: 'zh-CN', // 回退语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
  globalInjection: true, // 全局注入 $t 函数
})

export default i18n
