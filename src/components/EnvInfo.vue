<template>
  <div class="env-info">
    <div class="env-header">
      <h2 class="env-title">
        <span class="env-icon">🌍</span>
        环境信息
      </h2>
      <div class="env-badge" :style="{ backgroundColor: envColor }">
        {{ envType }}
      </div>
    </div>

    <div class="env-content">
      <div v-for="item in envList" :key="item.key" class="env-item">
        <div class="env-label">{{ item.label }}</div>
        <div class="env-value">
          <code>{{ item.value }}</code>
        </div>
      </div>
    </div>

    <div class="env-footer">
      <p class="env-tip">💡 提示：环境变量配置文件位于项目根目录的 <code>.env.*</code> 文件中</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 环境信息展示组件
 * 用于展示当前环境变量配置
 */
import { computed } from 'vue'
import {
  getEnv,
  getEnvMode,
  isDev,
  isTest,
  isProd,
  getApiBaseUrl,
  getAppTitle,
  getAppVersion,
  useMock,
} from '@/utils/env'

// 获取所有环境变量
const env = getEnv()

// 环境标识
const envMode = computed(() => getEnvMode())

// 环境类型
const envType = computed(() => {
  if (isDev()) return '开发环境'
  if (isTest()) return '测试环境'
  if (isProd()) return '生产环境'
  return '未知环境'
})

// 环境标签颜色
const envColor = computed(() => {
  if (isDev()) return '#52c41a'
  if (isTest()) return '#faad14'
  if (isProd()) return '#f5222d'
  return '#d9d9d9'
})

// 环境变量列表
const envList = computed(() => [
  { label: '环境标识', value: envMode.value, key: 'VITE_ENV' },
  { label: '应用标题', value: getAppTitle(), key: 'VITE_APP_TITLE' },
  { label: '应用版本', value: getAppVersion(), key: 'VITE_APP_VERSION' },
  { label: 'API 基础路径', value: getApiBaseUrl(), key: 'VITE_API_BASE_URL' },
  { label: 'API 代理目标', value: env.VITE_API_PROXY_TARGET, key: 'VITE_API_PROXY_TARGET' },
  { label: '启用 Mock', value: useMock() ? '是' : '否', key: 'VITE_USE_MOCK' },
  { label: '开发端口', value: env.VITE_PORT, key: 'VITE_PORT' },
  { label: '删除 Console', value: env.VITE_DROP_CONSOLE ? '是' : '否', key: 'VITE_DROP_CONSOLE' },
  { label: '生成 Sourcemap', value: env.VITE_SOURCEMAP ? '是' : '否', key: 'VITE_SOURCEMAP' },
])
</script>

<style lang="scss" scoped>
.env-info {
  background-color: $background-color-white;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-base;
  overflow: hidden;
}

.env-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-lg;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.env-title {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin: 0;
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
}

.env-icon {
  font-size: 24px;
}

.env-badge {
  padding: $spacing-xs $spacing-md;
  border-radius: $border-radius-base;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: white;
}

.env-content {
  padding: $spacing-lg;
}

.env-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-md 0;
  border-bottom: $border-width-base solid $border-color-light;

  &:last-child {
    border-bottom: none;
  }
}

.env-label {
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: $text-color-secondary;
}

.env-value {
  code {
    padding: $spacing-xs $spacing-sm;
    background-color: $background-color-light;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
    font-family: 'Courier New', monospace;
    color: $primary-color;
  }
}

.env-footer {
  padding: $spacing-lg;
  background-color: $background-color-light;
  border-top: $border-width-base solid $border-color-light;
}

.env-tip {
  margin: 0;
  font-size: $font-size-sm;
  color: $text-color-secondary;

  code {
    padding: 2px 6px;
    background-color: white;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
    color: $primary-color;
  }
}
</style>
