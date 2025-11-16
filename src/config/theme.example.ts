/**
 * 主题配置使用示例
 *
 * 本文件展示如何在项目中使用主题配置
 *
 * 核心原理：
 * 1. 使用 Ant Design Vue 的 ConfigProvider 组件包裹整个应用（在 App.vue 中）
 * 2. 通过 computed 响应式地传递主题配置给 ConfigProvider
 * 3. 当 store 中的主题色或主题模式改变时，ConfigProvider 会自动更新所有组件的样式
 * 4. 不需要手动操作 CSS 变量或样式覆盖，完全由 Ant Design Vue 的主题系统处理
 */

import { useAppStore } from '@/store/modules/app'
import { THEME_COLORS, DEFAULT_THEME_COLOR, DEFAULT_THEME_MODE } from './theme'

/**
 * 示例 1: 在组件中切换主题模式
 */
export function exampleToggleTheme() {
  const appStore = useAppStore()

  // 切换明暗主题
  appStore.toggleTheme()

  // 或者直接设置
  appStore.setTheme('dark') // 'light' | 'dark'
}

/**
 * 示例 2: 在组件中设置主题色
 */
export function exampleSetThemeColor() {
  const appStore = useAppStore()

  // 设置为预设主题色
  appStore.setThemeColor(THEME_COLORS[0].value) // 拂晓蓝

  // 或者设置为自定义颜色
  appStore.setThemeColor('#1890ff')
}

/**
 * 示例 3: 获取当前主题配置
 */
export function exampleGetThemeConfig() {
  const appStore = useAppStore()

  // 获取当前主题模式
  const currentTheme = appStore.theme // 'light' | 'dark'

  // 获取当前主题色
  const currentColor = appStore.themeColor // '#1890ff'

  // 判断是否为深色模式
  const _isDark = appStore.isDark()

  // 返回主题配置信息
  return {
    theme: currentTheme,
    color: currentColor,
    isDark: _isDark,
  }
}

/**
 * 示例 4: 在 Vue 组件中使用
 */
/*
<template>
  <div>
    <button @click="toggleTheme">切换主题</button>
    <button @click="changeColor">更改主题色</button>
    <p>当前主题: {{ appStore.theme }}</p>
    <p>当前主题色: {{ appStore.themeColor }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { THEME_COLORS } from '@/config/theme'

const appStore = useAppStore()

const toggleTheme = () => {
  appStore.toggleTheme()
}

const changeColor = () => {
  // 随机选择一个主题色
  const randomColor = THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)]
  appStore.setThemeColor(randomColor.value)
}
</script>
*/

/**
 * 示例 5: 在 CSS 中使用主题变量
 */
/*
.my-component {
  // 使用主题色
  color: var(--primary-color);

  // 使用文字颜色
  color: var(--text-color);
  color: var(--text-color-secondary);

  // 使用背景颜色
  background-color: var(--background-color);
  background-color: var(--background-color-white);

  // 使用边框颜色
  border: 1px solid var(--border-color);
}
*/

/**
 * 示例 6: 重置主题配置
 */
export function exampleResetTheme() {
  const appStore = useAppStore()

  // 重置为默认主题
  appStore.setTheme(DEFAULT_THEME_MODE)
  appStore.setThemeColor(DEFAULT_THEME_COLOR)

  // 或者使用 reset 方法重置所有配置
  appStore.reset()
}

/**
 * 示例 7: 监听主题变化
 */
/*
<script setup lang="ts">
import { watch } from 'vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

// 监听主题模式变化
watch(() => appStore.theme, (newTheme) => {
  console.log('主题模式已切换为:', newTheme)
  // 执行其他操作...
})

// 监听主题色变化
watch(() => appStore.themeColor, (newColor) => {
  console.log('主题色已更改为:', newColor)
  // 执行其他操作...
})
</script>
*/
