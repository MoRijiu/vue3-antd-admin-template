<template>
  <div class="home">
    <div class="welcome">
      <h1 class="title">欢迎使用 {{ appTitle }}</h1>
      <p class="version">版本: {{ appVersion }}</p>
    </div>

    <a-row :gutter="16">
      <a-col :span="24">
        <EnvInfo />
      </a-col>
    </a-row>

    <a-divider />

    <a-row :gutter="16">
      <a-col :span="24">
        <StoreDemo />
      </a-col>
    </a-row>

    <a-divider />

    <a-row :gutter="16">
      <a-col :span="24">
        <PermissionDemo />
      </a-col>
    </a-row>

    <a-divider />

    <a-row :gutter="16">
      <a-col :span="24">
        <AutoImportDemo />
      </a-col>
    </a-row>

    <a-divider />

    <a-row :gutter="16">
      <a-col :span="24">
        <LocaleDemo />
      </a-col>
    </a-row>

    <a-divider />

    <a-row :gutter="16">
      <a-col :span="24">
        <UtilsDemo />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
/**
 * 首页
 * 演示：Vue API 已自动导入，无需手动 import ref、onMounted 等
 * 演示：组件已自动导入，无需手动 import EnvInfo、StoreDemo 等
 */
import { getAppTitle, getAppVersion } from '@/utils/env'

const appTitle = ref(getAppTitle())
const appVersion = ref(getAppVersion())

onMounted(() => {
  console.log('首页加载完成')
})
</script>

<style lang="scss" scoped>
.home {
  padding: $spacing-lg;
}

.welcome {
  text-align: center;
  margin-bottom: $spacing-xl;
  padding: $spacing-xl;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: $border-radius-lg;
  color: white;
}

.title {
  font-size: $font-size-xxl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-sm;
}

.version {
  font-size: $font-size-base;
  opacity: 0.9;
}
</style>
