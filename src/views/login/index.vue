<template>
  <div class="login">
    <div class="login-container">
      <div class="login-header">
        <h1>Vue3 Ant Design Admin</h1>
        <p>{{ t('login.welcome') }}</p>
      </div>

      <a-form :model="formState" @finish="handleLogin">
        <a-form-item name="username">
          <a-input
            v-model:value="formState.username"
            size="large"
            :placeholder="t('login.usernamePlaceholder')"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password">
          <a-input-password
            v-model:value="formState.password"
            size="large"
            :placeholder="t('login.passwordPlaceholder')"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" block :loading="loading">
            {{ t('login.login') }}
          </a-button>
        </a-form-item>
      </a-form>

      <div class="login-footer">
        <a-space>
          <a-button type="link" @click="changeLocale('zh-CN')">中文</a-button>
          <a-button type="link" @click="changeLocale('en-US')">English</a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 登录页面
 */
import { useUserStore } from '@/store/modules/user'
import { useLocale } from '@/composables/useLocale'
import type { LoginParams } from '@/api/example'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { t, changeLocale } = useLocale()
const loading = ref(false)

// 表单数据
const formState = ref<LoginParams>({
  username: 'admin',
  password: '123456',
})

// 登录
async function handleLogin() {
  loading.value = true
  try {
    // 使用 Store 的登录方法
    await userStore.loginAction(formState.value)
    message.success(t('login.loginSuccess'))

    // 获取重定向地址（如果有）
    const redirect = (route.query.redirect as string) || '/'

    // 跳转到重定向地址或首页
    await router.push(redirect)
  } catch (error: any) {
    console.error('登录失败:', error)
    message.error(error.message || t('login.loginFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-container {
  width: 400px;
  padding: $spacing-xl;
  background-color: $background-color-white;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-lg;
}

.login-header {
  text-align: center;
  margin-bottom: $spacing-xl;

  h1 {
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    color: $primary-color;
    margin-bottom: $spacing-sm;
  }

  p {
    color: $text-color-secondary;
  }
}

.login-footer {
  text-align: center;
  margin-top: $spacing-md;
}
</style>
