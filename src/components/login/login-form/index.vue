<!--
  登录表单组件
  用于用户登录
-->
<template>
  <div class="login-form">
    <!-- 标题 -->
    <div class="login-form-header">
      <h2 class="login-form-title">{{ t('login.pageTitle') }}🚀</h2>
      <p class="login-form-subtitle">{{ t('login.pageSubtitle') }}</p>
    </div>

    <!-- 表单 -->
    <a-form
      :model="formState"
      :rules="rules"
      layout="vertical"
      class="login-form-content"
      @finish="handleSubmit"
    >
      <!-- 用户名 -->
      <a-form-item name="username" :label="t('login.username')">
        <a-input
          v-model:value="formState.username"
          :placeholder="t('login.usernamePlaceholder')"
          size="large"
          allow-clear
        >
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <!-- 密码 -->
      <a-form-item name="password" :label="t('login.password')">
        <a-input-password
          v-model:value="formState.password"
          :placeholder="t('login.passwordPlaceholder')"
          size="large"
          allow-clear
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <!-- 登录按钮 -->
      <a-form-item style="margin-top: 32px">
        <a-button type="primary" html-type="submit" size="large" :loading="loading" block>
          {{ t('login.loginButton') }}
        </a-button>
      </a-form-item>

      <!-- 注册链接 -->
      <a-form-item>
        <div class="register-link">
          <span>{{ t('login.noAccount') }}</span>
          <a @click="handleRegister">{{ t('login.registerNow') }}</a>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useLocale } from '@/composables/useLocale'

/**
 * 组件事件
 */
interface Emits {
  (e: 'submit', data: LoginFormData): void // 提交登录
  (e: 'register'): void // 切换到注册
}

const emit = defineEmits<Emits>()

// 国际化
const { t } = useLocale()

// 加载状态
const loading = ref(false)

/**
 * 登录表单数据
 */
interface LoginFormData {
  username: string
  password: string
}

// 表单数据
const formState = reactive<LoginFormData>({
  username: '',
  password: '',
})

// 表单验证规则
const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: t('login.usernameRequired'), trigger: 'blur' }],
  password: [
    { required: true, message: t('login.passwordRequired'), trigger: 'blur' },
    { min: 6, message: t('login.passwordLength'), trigger: 'blur' },
  ],
}

/**
 * 提交表单
 */
async function handleSubmit() {
  loading.value = true
  try {
    // 触发提交事件
    emit('submit', { ...formState })
  } catch (error: any) {
    message.error(error.message || t('login.loginFailed'))
  } finally {
    loading.value = false
  }
}

/**
 * 切换到注册
 */
function handleRegister() {
  emit('register')
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 100%;

  &-header {
    text-align: center;
    margin-bottom: 32px;
  }

  &-title {
    font-size: 28px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 8px;
  }

  &-subtitle {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin: 0;
  }

  &-content {
    :deep(.ant-form-item) {
      margin-bottom: 20px;
    }

    :deep(.ant-input-affix-wrapper),
    :deep(.ant-input) {
      border-radius: 8px;
    }
  }

  .register-link {
    text-align: center;
    font-size: 14px;
    color: var(--text-color-secondary);

    a {
      color: var(--primary-color);
      margin-left: 8px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
