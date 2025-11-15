<template>
  <div class="auto-import-demo">
    <h2 class="demo-title">自动导入示例</h2>

    <!-- Vue API 自动导入 -->
    <a-card title="Vue API 自动导入" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <div class="info-item">
          <span class="label">ref:</span>
          <span class="value">{{ count }}</span>
          <a-button @click="count++">增加</a-button>
        </div>

        <div class="info-item">
          <span class="label">computed:</span>
          <span class="value">{{ doubleCount }}</span>
        </div>

        <div class="info-item">
          <span class="label">reactive:</span>
          <span class="value">{{ state.name }}</span>
          <a-input v-model:value="state.name" placeholder="输入名称" style="width: 200px" />
        </div>
      </a-space>
    </a-card>

    <!-- Vue Router 自动导入 -->
    <a-card title="Vue Router 自动导入" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <div class="info-item">
          <span class="label">当前路径:</span>
          <span class="value">{{ route.path }}</span>
        </div>

        <div class="info-item">
          <span class="label">路由名称:</span>
          <span class="value">{{ route.name }}</span>
        </div>

        <a-space>
          <a-button @click="router.push('/home')">跳转首页</a-button>
          <a-button @click="router.push('/user')">跳转用户</a-button>
        </a-space>
      </a-space>
    </a-card>

    <!-- Pinia 自动导入 -->
    <a-card title="Pinia 自动导入" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <div class="info-item">
          <span class="label">用户名:</span>
          <span class="value">{{ userStore.username() || '未登录' }}</span>
        </div>

        <div class="info-item">
          <span class="label">主题:</span>
          <span class="value">{{ appStore.theme }}</span>
        </div>

        <a-space>
          <a-button @click="appStore.toggleTheme()">切换主题</a-button>
          <a-button @click="appStore.toggleCollapsed()">切换侧边栏</a-button>
        </a-space>
      </a-space>
    </a-card>

    <!-- Ant Design Vue 自动导入 -->
    <a-card title="Ant Design Vue 自动导入" class="demo-card">
      <a-space>
        <a-button type="primary" @click="showMessage">显示消息</a-button>
        <a-button @click="showNotification">显示通知</a-button>
        <a-button @click="showModal">显示对话框</a-button>
      </a-space>
    </a-card>

    <!-- 组件自动导入 -->
    <a-card title="组件自动导入" class="demo-card">
      <p class="tip">✅ 所有 src/components 和 src/layouts 下的组件都会自动导入，无需手动 import</p>
      <p class="tip">✅ Ant Design Vue 组件也会自动导入，无需手动 import</p>
      <p class="tip">✅ 示例：EnvInfo、StoreDemo、PermissionDemo 等组件都已自动导入</p>
    </a-card>

    <!-- 生命周期自动导入 -->
    <a-card title="生命周期自动导入" class="demo-card">
      <p class="tip">✅ onMounted、onUnmounted 等生命周期钩子已自动导入</p>
      <p class="tip">✅ 打开控制台查看生命周期日志</p>
    </a-card>
  </div>
</template>

<script setup lang="ts">
/**
 * 自动导入示例组件
 * 演示如何使用自动导入功能
 * 注意：所有 Vue、Vue Router、Pinia、Ant Design Vue 的 API 都无需手动 import
 */

// ==================== 无需导入，直接使用 ====================
// import { ref, computed, reactive } from 'vue' // ❌ 不需要
// import { useRoute, useRouter } from 'vue-router' // ❌ 不需要
// import { message, notification, Modal } from 'ant-design-vue' // ❌ 不需要

import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'

// Vue API - 自动导入
const count = ref(0)
const doubleCount = computed(() => count.value * 2)
const state = reactive({
  name: 'Auto Import',
})

// Vue Router - 自动导入
const route = useRoute()
const router = useRouter()

// Pinia - 自动导入
const userStore = useUserStore()
const appStore = useAppStore()

// 生命周期 - 自动导入
onMounted(() => {
  console.log('✅ AutoImportDemo 组件已挂载（onMounted 自动导入）')
})

onUnmounted(() => {
  console.log('✅ AutoImportDemo 组件已卸载（onUnmounted 自动导入）')
})

// Ant Design Vue - 自动导入
function showMessage() {
  message.success('这是一条成功消息（message 自动导入）')
}

function showNotification() {
  notification.info({
    message: '通知标题',
    description: '这是一条通知消息（notification 自动导入）',
  })
}

function showModal() {
  Modal.confirm({
    title: '确认对话框',
    content: '这是一个确认对话框（Modal 自动导入）',
    onOk() {
      message.success('点击了确定')
    },
  })
}
</script>

<style lang="scss" scoped>
.auto-import-demo {
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
  gap: $spacing-md;
  padding: $spacing-sm 0;
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

.tip {
  margin: $spacing-sm 0;
  padding: $spacing-sm;
  background-color: $background-color-light;
  border-left: 3px solid $primary-color;
  color: $text-color-secondary;
}
</style>
