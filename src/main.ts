/*
 * @Author: morijiu
 * @Date: 2025-11-15 15:43:33
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-11-16 20:27:02
 * @Description:
 * @FilePath: \vue3-antd-admin-template\src\main.ts
 */
import { createApp } from 'vue'

// Ant Design Vue（最先导入，避免被 UnoCSS reset 覆盖）
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// UnoCSS 样式（不使用 reset，避免覆盖 Ant Design 样式）
import 'virtual:uno.css'

// 全局样式
import '@/styles/global.scss'
// Ant Design Vue 主题样式
import '@/styles/antd-theme.scss'
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
// Ant Design Vue 主题配置
import { setupAntdTheme, watchThemeChange } from './plugins/antd-theme'

import App from './App.vue'

const app = createApp(App)

// 使用 Pinia（必须先使用 Pinia，因为主题配置依赖 store）
app.use(pinia)
// 使用 Ant Design Vue
app.use(Antd)
// 配置 Ant Design Vue 主题
setupAntdTheme(app)
// 使用路由
app.use(router)
// 使用 i18n
app.use(i18n)
// 注册全局指令
setupDirectives(app)

app.mount('#app')

// 监听主题变化（在应用挂载后）
watchThemeChange()
