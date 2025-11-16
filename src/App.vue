<!--
 * @Author: morijiu
 * @Date: 2025-11-15 15:43:33
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-11-16 19:22:04
 * @Description:
 * @FilePath: \vue3-antd-admin-template\src\App.vue
-->
<template>
  <a-config-provider :theme="themeConfig">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { theme } from 'ant-design-vue'
import { useAppStore } from '@/store/modules/app'

/**
 * App 根组件
 */

// App Store
const appStore = useAppStore()

// Ant Design Vue 主题配置
const themeConfig = computed(() => {
  const isDark = appStore.theme === 'dark'

  return {
    // 使用 Ant Design 的主题算法
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    // Token 配置
    token: {
      // 主题色
      colorPrimary: appStore.themeColor,
      // 圆角
      borderRadius: 8,
      // 字体
      fontSize: 14,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      // 动画
      motionUnit: 0.1,
      motionBase: 0,
      motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      motionEaseIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    },
  }
})

// 初始化主题
onMounted(() => {
  appStore.initTheme()
})
</script>
