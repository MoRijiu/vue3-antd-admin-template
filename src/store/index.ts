/*
 * @Author: morijiu
 * @Date: 2025-11-15 19:51:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-11-15 19:53:14
 * @Description:
 * @FilePath: \vue3-antd-admin-template\src\store\index.ts
 */
/**
 * Pinia Store 入口
 */

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建 Pinia 实例
const pinia = createPinia()

// 使用持久化插件
pinia.use(piniaPluginPersistedstate)

export default pinia

// 导出所有 store
export * from './modules/user'
export * from './modules/app'
export * from './modules/permission'
