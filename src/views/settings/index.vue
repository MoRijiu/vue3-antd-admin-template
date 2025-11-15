<template>
  <div class="settings">
    <h2>系统设置</h2>

    <a-form :model="settings" layout="vertical">
      <a-form-item label="站点名称">
        <a-input v-model:value="settings.siteName" />
      </a-form-item>

      <a-form-item label="站点描述">
        <a-textarea v-model:value="settings.siteDescription" :rows="4" />
      </a-form-item>

      <a-form-item label="启用缓存">
        <a-switch v-model:checked="settings.enableCache" />
      </a-form-item>

      <a-form-item label="启用权限">
        <a-switch v-model:checked="settings.enablePermission" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary">保存设置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
/**
 * 系统设置页面
 */
import { ref } from 'vue'

const settings = ref({
  siteName: 'Vue3 Ant Design Admin',
  siteDescription: '基于 Vue3 + Ant Design Vue 的后台管理系统',
  enableCache: true,
  enablePermission: true,
})
</script>

<style lang="scss" scoped>
.settings {
  h2 {
    margin-bottom: $spacing-lg;
  }
}
</style>
