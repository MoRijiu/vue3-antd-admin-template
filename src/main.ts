/*
 * @Author: morijiu
 * @Date: 2025-11-15 15:43:33
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-11-15 20:59:51
 * @Description:
 * @FilePath: \vue3-antd-admin-template\src\main.ts
 */
import { createApp } from 'vue'

// UnoCSS 重置样式
import '@unocss/reset/tailwind.css'
// UnoCSS 样式
import 'virtual:uno.css'

// 全局样式
import '@/styles/global.scss'
// 自定义样式
import './style.css'

// 路由
import router from './router'
// Pinia
import pinia from './store'
// 指令
import { setupDirectives } from './directives'
// i18n
import i18n from './locales'

import App from './App.vue'

const app = createApp(App)

// 使用 Pinia
app.use(pinia)
// 使用路由
app.use(router)
// 使用 i18n
app.use(i18n)
// 注册全局指令
setupDirectives(app)

app.mount('#app')
