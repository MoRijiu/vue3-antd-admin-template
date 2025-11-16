<template>
  <a-layout class="layout">
    <!-- 侧边栏 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <span v-if="!collapsed">Admin</span>
        <span v-else>A</span>
      </div>
      <a-menu theme="dark" mode="inline" :items="menuItems" @click="handleMenuClick" />
    </a-layout-sider>

    <!-- 主体 -->
    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="header">
        <div class="header-content">
          <h1>Vue3 Ant Design Admin</h1>
          <div class="header-actions">
            <span class="username">{{ userStore.username() || '未登录' }}</span>
            <a-button type="link" @click="handleLogout">退出</a-button>
          </div>
        </div>
      </a-layout-header>

      <!-- 内容 -->
      <a-layout-content class="content">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <keep-alive :include="route.meta.keepAlive ? [route.name as string] : []">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </a-layout-content>

      <!-- 底部 -->
      <a-layout-footer class="footer">
        <div class="footer-content">Vue3 Ant Design Admin ©2025</div>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
/**
 * 默认布局
 */
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { useLocale } from '@/composables/useLocale'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

// 侧边栏折叠状态（使用 Store）
const collapsed = computed({
  get: () => appStore.collapsed,
  set: (value: boolean) => appStore.setCollapsed(value),
})

const { t } = useLocale()

// 菜单项
const menuItems = computed(() => [
  {
    key: '/home',
    icon: 'HomeOutlined',
    label: t('menu.home'),
  } as any,
  {
    key: '/user',
    icon: 'UserOutlined',
    label: t('menu.user'),
  } as any,
  {
    key: '/settings',
    icon: 'SettingOutlined',
    label: t('menu.settings'),
  } as any,
])

// 菜单点击
function handleMenuClick({ key }: { key: string | number }) {
  router.push(key as string)
}

// 退出登录
function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.header {
  background-color: $background-color-white;
  padding: 0 $spacing-lg;
  box-shadow: $box-shadow-sm;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    margin: 0;
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
  }
}

.content {
  margin: $spacing-lg;
  padding: $spacing-lg;
  background-color: $background-color-white;
  border-radius: $border-radius-base;
  min-height: 280px;
}

.footer {
  text-align: center;
  background-color: $background-color-white;
}

.footer-content {
  color: $text-color-secondary;
}

// 路由过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-duration-base $ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
