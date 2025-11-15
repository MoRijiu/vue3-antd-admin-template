<template>
  <div class="store-demo">
    <h2 class="demo-title">Pinia Store 示例</h2>

    <!-- 用户 Store -->
    <a-card title="用户 Store" class="demo-card">
      <div class="info-item">
        <span class="label">Token:</span>
        <span class="value">{{ userStore.token || '未登录' }}</span>
      </div>
      <div class="info-item">
        <span class="label">用户名:</span>
        <span class="value">{{ userStore.username() || '未设置' }}</span>
      </div>
      <div class="info-item">
        <span class="label">邮箱:</span>
        <span class="value">{{ userStore.email() || '未设置' }}</span>
      </div>
      <div class="info-item">
        <span class="label">是否登录:</span>
        <span class="value">{{ userStore.isLoggedIn() ? '是' : '否' }}</span>
      </div>

      <a-space class="actions">
        <a-button type="primary" @click="handleLogin">模拟登录</a-button>
        <a-button @click="handleLogout">退出登录</a-button>
      </a-space>
    </a-card>

    <!-- 应用 Store -->
    <a-card title="应用 Store" class="demo-card">
      <div class="info-item">
        <span class="label">侧边栏折叠:</span>
        <span class="value">{{ appStore.collapsed ? '是' : '否' }}</span>
      </div>
      <div class="info-item">
        <span class="label">设备类型:</span>
        <span class="value">{{ appStore.device }}</span>
      </div>
      <div class="info-item">
        <span class="label">主题:</span>
        <span class="value">{{ appStore.theme }}</span>
      </div>
      <div class="info-item">
        <span class="label">语言:</span>
        <span class="value">{{ appStore.locale }}</span>
      </div>

      <a-space class="actions">
        <a-button @click="appStore.toggleCollapsed()">切换侧边栏</a-button>
        <a-button @click="appStore.toggleTheme()">切换主题</a-button>
        <a-button @click="appStore.setDevice('mobile')">设为移动端</a-button>
        <a-button @click="appStore.setDevice('desktop')">设为桌面端</a-button>
      </a-space>
    </a-card>

    <!-- 权限 Store -->
    <a-card title="权限 Store" class="demo-card">
      <div class="info-item">
        <span class="label">路由已生成:</span>
        <span class="value">{{ permissionStore.isRoutesGenerated ? '是' : '否' }}</span>
      </div>
      <div class="info-item">
        <span class="label">所有路由数:</span>
        <span class="value">{{ permissionStore.allRoutes.length }}</span>
      </div>
      <div class="info-item">
        <span class="label">菜单路由数:</span>
        <span class="value">{{ permissionStore.menuRoutes.length }}</span>
      </div>

      <a-space class="actions">
        <a-button type="primary" @click="handleGenerateRoutes">生成路由</a-button>
        <a-button @click="permissionStore.resetRoutes()">重置路由</a-button>
      </a-space>
    </a-card>

    <!-- 操作按钮 -->
    <a-card title="全局操作" class="demo-card">
      <a-space>
        <a-button danger @click="handleResetAll">重置所有 Store</a-button>
        <a-button danger @click="handleClearPersist">清除持久化数据</a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
/**
 * Pinia Store 示例组件
 */
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { resetAllStores, clearAllPersist } from '@/store/utils'

// 使用 Store
const userStore = useUserStore()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

/**
 * 模拟登录
 */
function handleLogin() {
  userStore.setUserInfo({
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
  })
  userStore.token = 'mock-token-123456'
  message.success('登录成功')
}

/**
 * 退出登录
 */
function handleLogout() {
  userStore.logout()
  message.success('已退出登录')
}

/**
 * 生成路由
 */
function handleGenerateRoutes() {
  permissionStore.generateRoutes(['admin'])
  message.success('路由生成成功')
}

/**
 * 重置所有 Store
 */
function handleResetAll() {
  resetAllStores()
  message.success('所有 Store 已重置')
}

/**
 * 清除持久化数据
 */
function handleClearPersist() {
  clearAllPersist()
  message.success('持久化数据已清除')
}
</script>

<style lang="scss" scoped>
.store-demo {
  padding: $spacing-lg;
}

.demo-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $primary-color;
  margin-bottom: $spacing-lg;
}

.demo-card {
  margin-bottom: $spacing-lg;
}

.info-item {
  display: flex;
  align-items: center;
  padding: $spacing-sm 0;
  border-bottom: 1px solid $border-color-light;

  &:last-child {
    border-bottom: none;
  }
}

.label {
  width: 120px;
  font-weight: $font-weight-medium;
  color: $text-color-secondary;
}

.value {
  flex: 1;
  color: $text-color;
  font-family: monospace;
}

.actions {
  margin-top: $spacing-md;
}
</style>
