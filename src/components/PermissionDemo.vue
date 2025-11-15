<template>
  <div class="permission-demo">
    <h2 class="demo-title">权限指令示例</h2>

    <!-- 设置权限 -->
    <a-card title="设置权限" class="demo-card">
      <a-space>
        <a-button @click="setPermissions(['read'])">设置读权限</a-button>
        <a-button @click="setPermissions(['read', 'write'])">设置读写权限</a-button>
        <a-button @click="setPermissions(['read', 'write', 'delete'])">设置全部权限</a-button>
        <a-button @click="setPermissions([])">清除权限</a-button>
      </a-space>

      <div class="info-item">
        <span class="label">当前权限:</span>
        <span class="value">{{ userStore.permissions.join(', ') || '无' }}</span>
      </div>
    </a-card>

    <!-- 权限指令示例 -->
    <a-card title="v-permission 指令" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <!-- 单个权限 -->
        <div v-permission="'read'" class="permission-box">
          <a-tag color="green">✓ 有读权限才显示</a-tag>
        </div>

        <!-- 多个权限（任一） -->
        <div v-permission="['write', 'delete']" class="permission-box">
          <a-tag color="blue">✓ 有写或删除权限才显示</a-tag>
        </div>

        <!-- 特定权限 -->
        <div v-permission="'admin'" class="permission-box">
          <a-tag color="red">✓ 有管理员权限才显示</a-tag>
        </div>
      </a-space>
    </a-card>

    <!-- 角色指令示例 -->
    <a-card title="v-role 指令" class="demo-card">
      <a-space>
        <a-button @click="setRoles(['user'])">设为普通用户</a-button>
        <a-button @click="setRoles(['admin'])">设为管理员</a-button>
        <a-button @click="setRoles([])">清除角色</a-button>
      </a-space>

      <div class="info-item">
        <span class="label">当前角色:</span>
        <span class="value">{{ userStore.roles.join(', ') || '无' }}</span>
      </div>

      <a-space direction="vertical" style="width: 100%; margin-top: 16px">
        <div v-role="'user'" class="permission-box">
          <a-tag color="green">✓ 普通用户可见</a-tag>
        </div>

        <div v-role="'admin'" class="permission-box">
          <a-tag color="red">✓ 管理员可见</a-tag>
        </div>
      </a-space>
    </a-card>

    <!-- 组合式函数示例 -->
    <a-card title="usePermission 组合式函数" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <div class="info-item">
          <span class="label">hasPermission('read'):</span>
          <span class="value">{{ hasPermission('read') ? '是' : '否' }}</span>
        </div>

        <div class="info-item">
          <span class="label">hasPermission('write'):</span>
          <span class="value">{{ hasPermission('write') ? '是' : '否' }}</span>
        </div>

        <div class="info-item">
          <span class="label">hasRole('admin'):</span>
          <span class="value">{{ hasRole('admin') ? '是' : '否' }}</span>
        </div>

        <div class="info-item">
          <span class="label">hasAnyPermission(['read', 'write']):</span>
          <span class="value">{{ hasAnyPermission(['read', 'write']) ? '是' : '否' }}</span>
        </div>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
/**
 * 权限指令示例组件
 */
import { useUserStore } from '@/store/modules/user'
import { usePermission } from '@/composables/usePermission'

const userStore = useUserStore()
const { hasPermission, hasRole, hasAnyPermission } = usePermission()

/**
 * 设置权限
 */
function setPermissions(permissions: string[]) {
  userStore.setPermissions(permissions)
}

/**
 * 设置角色
 */
function setRoles(roles: string[]) {
  userStore.setRoles(roles)
}
</script>

<style lang="scss" scoped>
.permission-demo {
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
  margin-top: $spacing-sm;
}

.label {
  width: 200px;
  font-weight: $font-weight-medium;
  color: $text-color-secondary;
}

.value {
  flex: 1;
  color: $text-color;
  font-family: monospace;
}

.permission-box {
  padding: $spacing-sm;
  background-color: $background-color-light;
  border-radius: $border-radius-base;
}
</style>
