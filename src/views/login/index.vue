<!--
  登录页面
  包含登录和注册功能，使用毛玻璃效果的弹框
-->
<template>
  <div class="login-page">
    <!-- 背景层 -->
    <div class="login-background" :style="{ backgroundImage }"></div>

    <!-- 内容层 -->
    <div class="login-content">
      <!-- 左侧：网站信息和特性 -->
      <div class="login-info">
        <div class="info-header">
          <h1 class="site-title">{{ appTitle }}</h1>
          <p class="site-description">{{ appDescription }}</p>
        </div>

        <!-- 特性列表 -->
        <FeatureList />
      </div>

      <!-- 右侧：登录/注册表单和功能区 -->
      <div class="login-right-section">
        <!-- 登录表单容器 -->
        <div class="login-form-wrapper">
          <!-- 毛玻璃容器 -->
          <div class="login-form-container">
            <!-- 登录表单 -->
            <transition name="fade" mode="out-in">
              <LoginForm
                v-if="!isRegisterMode"
                @submit="handleLogin"
                @register="handleSwitchToRegister"
              />
              <!-- 注册表单 -->
              <RegisterForm v-else @submit="handleRegister" @back="handleSwitchToLogin" />
            </transition>
          </div>
        </div>

        <!-- 功能设置面板 -->
        <SettingsPanel class="settings-panel-wrapper" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'
import { useLocale } from '@/composables/useLocale'
import LoginForm from '@/components/login/login-form/index.vue'
import RegisterForm from '@/components/login/register-form/index.vue'
import FeatureList from '@/components/login/feature-list/index.vue'
import SettingsPanel from '@/components/login/settings-panel/index.vue'
import bgLight from '@/assets/login/bg-light.jpg'
import bgDark from '@/assets/login/bg-dark.jpg'

// 路由
const router = useRouter()
const route = useRoute()

// Store
const userStore = useUserStore()
const appStore = useAppStore()

// 国际化
const { t } = useLocale()

// 根据主题模式计算背景图片
const backgroundImage = computed(() => {
  return appStore.theme === 'dark' ? `url(${bgDark})` : `url(${bgLight})`
})

// 从环境变量获取网站信息
const appTitle = import.meta.env.VITE_APP_TITLE || 'Vue3 Ant Design Admin'
const appDescription =
  import.meta.env.VITE_APP_DESCRIPTION || '基于 Vue3 + Ant Design Vue 的后台管理系统'

// 是否为注册模式
const isRegisterMode = ref(false)

/**
 * 切换到注册模式
 */
function handleSwitchToRegister() {
  isRegisterMode.value = true
}

/**
 * 切换到登录模式
 */
function handleSwitchToLogin() {
  isRegisterMode.value = false
}

/**
 * 处理登录
 */
async function handleLogin(formData: any) {
  try {
    // 使用 Store 的登录方法
    await userStore.loginAction({
      username: formData.username,
      password: formData.password,
    })
    message.success(t('login.loginSuccess'))

    // 获取重定向地址（如果有）
    const redirect = (route.query.redirect as string) || '/'

    // 跳转到重定向地址或首页
    await router.push(redirect)
  } catch (error: any) {
    console.error('登录失败:', error)
    message.error(error.message || t('login.loginFailed'))
    throw error
  }
}

/**
 * 处理注册
 */
async function handleRegister(formData: any) {
  try {
    // TODO: 实现注册逻辑
    console.log('注册数据:', formData)
    message.success(t('login.registerSuccess'))

    // 注册成功后切换到登录模式
    setTimeout(() => {
      isRegisterMode.value = false
    }, 1500)
  } catch (error: any) {
    console.error('注册失败:', error)
    message.error(error.message || t('login.registerFailed'))
    throw error
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

// 背景层
.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.3s ease;
}

// 内容层
.login-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 40px 120px 40px 200px;
  z-index: 1;

  @media (max-width: 1400px) {
    padding: 40px 80px 40px 150px;
  }

  @media (max-width: 1200px) {
    padding: 40px 60px 40px 100px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    gap: 20px;
  }
}

// 左侧网站信息
.login-info {
  flex: 1;
  max-width: 700px;
  min-width: 500px;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    min-width: 400px;
  }

  @media (max-width: 768px) {
    min-width: auto;
    text-align: center;
    margin-bottom: 40px;
  }

  .info-header {
    margin-bottom: 16px;
  }

  .site-title {
    font-size: 52px;
    font-weight: 700;
    margin-bottom: 16px;
    line-height: 1.2;
    color: var(--text-color);

    @media (max-width: 768px) {
      font-size: 36px;
    }
  }

  .site-description {
    font-size: 18px;
    line-height: 1.6;
    color: var(--text-color-secondary);

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
}

// 右侧区域（表单 + 功能区）
.login-right-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    width: 100%;
    gap: 16px;
  }
}

// 表单容器
.login-form-wrapper {
  position: relative;
  width: 480px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
  }
}

// 功能设置面板容器
.settings-panel-wrapper {
  flex-shrink: 0;
  align-self: flex-start;

  @media (max-width: 768px) {
    align-self: center;
  }
}

// 表单容器 - 整体毛玻璃效果
.login-form-container {
  position: relative;
  width: 100%;
  padding: 48px 40px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);

  @media (max-width: 768px) {
    padding: 32px 24px;
  }

  // 表单内容也使用毛玻璃效果
  :deep(.login-form),
  :deep(.register-form) {
    background: transparent;
    padding: 0;
  }

  // 表单头部左对齐
  :deep(.login-form-header),
  :deep(.register-form-header) {
    text-align: left;
  }

  // 调整表单内部元素的样式以适应毛玻璃背景
  :deep(.ant-form-item-label > label) {
    color: var(--text-color);
    font-weight: 500;
  }

  :deep(.ant-input),
  :deep(.ant-input-password),
  :deep(.ant-input-affix-wrapper) {
    background: var(--background-color-white);
    border-color: var(--border-color-light);
    color: var(--text-color);

    &:hover {
      border-color: var(--border-color);
    }

    &:focus,
    &:focus-within {
      border-color: var(--primary-color);
    }
  }

  // 移除浏览器自动填充的背景色和边框
  :deep(.ant-input:-webkit-autofill),
  :deep(.ant-input:-webkit-autofill:hover),
  :deep(.ant-input:-webkit-autofill:focus),
  :deep(.ant-input:-webkit-autofill:active) {
    -webkit-box-shadow: 0 0 0 1000px var(--background-color-white) inset !important;
    box-shadow: 0 0 0 1000px var(--background-color-white) inset !important;
    -webkit-text-fill-color: var(--text-color) !important;
    border: 1px solid var(--border-color-light) !important;
    caret-color: var(--text-color) !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  // 移除密码输入框自动填充的背景色和边框
  :deep(.ant-input-affix-wrapper > input:-webkit-autofill),
  :deep(.ant-input-affix-wrapper > input:-webkit-autofill:hover),
  :deep(.ant-input-affix-wrapper > input:-webkit-autofill:focus),
  :deep(.ant-input-affix-wrapper > input:-webkit-autofill:active) {
    -webkit-box-shadow: 0 0 0 1000px var(--background-color-white) inset !important;
    box-shadow: 0 0 0 1000px var(--background-color-white) inset !important;
    -webkit-text-fill-color: var(--text-color) !important;
    caret-color: var(--text-color) !important;
    border: none !important;
    outline: none !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  // 确保输入框容器在自动填充时也没有白色边框
  :deep(.ant-input-affix-wrapper:has(input:-webkit-autofill)) {
    border: 1px solid var(--border-color-light) !important;
    background: var(--background-color-white) !important;

    &:hover {
      border-color: var(--border-color) !important;
    }

    &:focus,
    &:focus-within {
      border-color: var(--primary-color) !important;
    }
  }

  :deep(.ant-input-prefix) {
    color: var(--text-color-tertiary);
  }

  :deep(.ant-checkbox-wrapper) {
    color: var(--text-color);
  }

  :deep(a) {
    color: var(--text-color-secondary);

    &:hover {
      color: var(--primary-color);
    }
  }

  :deep(.login-form-title),
  :deep(.register-form-title) {
    color: var(--text-color);
    text-align: left;
  }

  :deep(.login-form-subtitle),
  :deep(.register-form-subtitle) {
    color: var(--text-color-secondary);
    text-align: left;
  }

  :deep(.register-link),
  :deep(.back-to-login) {
    color: var(--text-color-secondary);

    a {
      color: var(--primary-color);
      font-weight: 500;

      &:hover {
        opacity: 0.8;
        text-decoration: underline;
      }
    }
  }
}

// 深色主题下的表单容器
html.dark .login-form-container {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
